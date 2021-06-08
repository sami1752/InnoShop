using Back.Clases.Ventas;
using Back.Models.Abstratos;
using Back.Models.DAL;
using Back.Models.Entidades.Descuentos;
using Back.Models.Entidades.Productos;
using Back.Models.Entidades.Ventas;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Servicios
{
    public class ServiciosVentas : IServiciosVentas
    {
        private readonly DBContext _context;

        public ServiciosVentas(DBContext context) => _context = context;

        public async Task<ActionResult<IEnumerable<DetalleVenta>>> ListarVentas()
        {
           await using (_context)
            {
                List<DetalleVenta> listaVentas = (from venta in _context.Ventas
                                                  join usuario in _context.Usuarioidentity
                                                  on venta.IdUsuario equals usuario.Id
                                                  join descuento in _context.Descuentos
                                                  on venta.IdDescuento equals descuento.IdDescuento
                                                  join porcentaje in _context.PorcentajesRuleta
                                                  on descuento.IdPorcentajeRuleta equals porcentaje.IdPorcentajeRuleta
                                                  join iva in _context.Iva on venta.IdIva equals iva.IdIva orderby venta.IdVenta descending
                                                  select new DetalleVenta
                                                  {
                                                      IdVenta=venta.IdVenta,
                                                      Fecha=venta.Fecha,
                                                      IdUsuario=venta.IdUsuario,
                                                      NombreUsuario=usuario.Nombres,
                                                      IdDescuento = venta.IdDescuento,
                                                      ValorDescuento = porcentaje.Porcentaje==0? 0 : venta.Total * (porcentaje.Porcentaje/100),
                                                      PorcentajeDescuento = porcentaje.Porcentaje,
                                                      Total = venta.Total,
                                                      IdIva = venta.IdIva,
                                                      ValorIva = iva.Porcentaje,
                                                      TotalIva = venta.TotalIva
                                                      
                                                  }).ToList();
                return listaVentas;
            }
        }
        public async Task<DetalleVenta> DetalleVenta(int idVenta)
        {
            await using (_context)
            {
                var subtotal = (from dVenta in _context.DetalleVentaProductos
                                where dVenta.IdVenta == idVenta
                                select dVenta.SubTotal).Sum();
                DetalleVenta detalleVenta = (from venta in _context.Ventas
                                                  join usuario in _context.Usuarioidentity
                                                  on venta.IdUsuario equals usuario.Id
                                                  join descuento in _context.Descuentos
                                                  on venta.IdDescuento equals descuento.IdDescuento
                                                  join porcentaje in _context.PorcentajesRuleta
                                                  on descuento.IdPorcentajeRuleta equals porcentaje.IdPorcentajeRuleta
                                                  join iva in _context.Iva on venta.IdIva equals iva.IdIva
                                                  where venta.IdVenta == idVenta
                                                  select new DetalleVenta
                                                  {
                                                      IdVenta = venta.IdVenta,
                                                      Fecha = venta.Fecha,
                                                      IdUsuario = venta.IdUsuario,
                                                      NombreUsuario = usuario.Nombres,
                                                      IdDescuento = venta.IdDescuento,
                                                      ValorDescuento = porcentaje.Porcentaje == 0 ? 0 : subtotal * (porcentaje.Porcentaje / 100),
                                                      PorcentajeDescuento = porcentaje.Porcentaje,
                                                      Total = venta.Total,
                                                      IdIva = venta.IdIva,
                                                      ValorIva = iva.Porcentaje,
                                                      TotalIva = venta.TotalIva

                                                  }).First();
                return detalleVenta;
            }
        }

        public async Task<Ventas> ObtenerVentaPorId(int idVenta) => await _context.Ventas.FindAsync(idVenta);

        public async Task<ActionResult<IEnumerable<DetalleVentaProductoInfo>>> ListarDetalleVentaProductos(int idVenta)
        {
            await using (_context)
            {
                List<DetalleVentaProductoInfo> listaDetalleProductosVenta = (from DVP in _context.DetalleVentaProductos
                                                                             join prod in _context.Productos
                                                                             on DVP.IdProducto equals prod.IdProducto
                                                                             where DVP.IdVenta == idVenta
                                                                             select new DetalleVentaProductoInfo
                                                                             {
                                                                                 IdDetalleVentaProducto = DVP.IdDetalleVentaProducto,
                                                                                 Cantidad = DVP.Cantidad,
                                                                                 SubTotal = DVP.SubTotal,
                                                                                 IdVenta = DVP.IdVenta,
                                                                                 IdProducto = DVP.IdProducto,
                                                                                 NombreProducto = prod.Nombre
                                                                             }).ToList();
                return listaDetalleProductosVenta;
            }
        }

        public async Task<ActionResult<IEnumerable<DetalleVentaSolicitudes>>> ListarDetalleVentaSolicitudes(int idVenta) =>
            await _context.DetalleVentaSolicitudes.Where(x => x.IdVenta == idVenta).ToListAsync();

        public async Task<ActionResult<IEnumerable<DetalleVentaMontajes>>> ListarDetalleVentaMontajes(int idVenta) =>
            await _context.DetalleVentaMontajes.Where(x => x.IdVenta == idVenta).ToListAsync();

        public async Task<Ventas> AgregarVenta(Ventas venta)
        {
            venta.Fecha = DateTime.Now;
            var iva = await ObtenerIvaActual();
            venta.IdIva = iva.IdIva;
            await _context.Ventas.AddAsync(venta);
            await _context.SaveChangesAsync();
            return venta;
        }
        public async Task AgregarDetalleVentaProducto(DetalleVentaProductos detalle)
        {
            var precio = await this.ObtenerPrecioProducto(detalle.IdProducto);
            detalle.SubTotal = precio.Precio * detalle.Cantidad;
            await _context.DetalleVentaProductos.AddAsync(detalle);
            await _context.SaveChangesAsync();
            var venta = await this.ObtenerVentaPorId(detalle.IdVenta);

            var usuario = await _context.Usuarioidentity.FindAsync(venta.IdUsuario);
            var prod = await _context.Productos.FindAsync(detalle.IdProducto);

            usuario.Puntos += (prod.Puntos * detalle.Cantidad);
            _context.Usuarioidentity.Update(usuario);
            await _context.SaveChangesAsync();

            float descuento = (from desc in _context.Descuentos
                                           join porc in _context.PorcentajesRuleta on desc.IdPorcentajeRuleta equals porc.IdPorcentajeRuleta
                                           where desc.IdDescuento == venta.IdDescuento
                                           select porc.Porcentaje).First();
            var iva = await this.ObtenerIvaActual();
            venta.IdIva = iva.IdIva;
            venta.Total += (detalle.Cantidad * precio.Precio)-descuento*(detalle.SubTotal/100);
            venta.TotalIva += (detalle.Cantidad * precio.Precio) * (iva.Porcentaje / 100);
            await this.ModificarValorTotalVentas(venta);

            Salida salida = new Salida()
            {
                IdSalida = 0,
                IdProducto = detalle.IdProducto,
                Cantidad = detalle.Cantidad,
                Fecha = DateTime.Now,
                IdUsuario = venta.IdUsuario
            };
            await this.AgregarSalidaProducto(salida);
        }
        public async Task<PrecioProducto> ObtenerPrecioProducto(int idProducto) =>
            await _context.PrecioProductos.Where(x => x.IdProducto == idProducto).OrderByDescending(x => x.IdPrecioProducto).FirstAsync();

        public async Task<Iva> ObtenerIvaActual() =>
            await _context.Iva.OrderByDescending(x => x.IdIva).FirstAsync();

        public async Task AgregarSalidaProducto(Salida salida)
        {
            salida.Fecha = DateTime.Now;
            await _context.Salidas.AddAsync(salida);
            await _context.SaveChangesAsync();
        }
        
        public async Task ModificarValorTotalVentas(Ventas venta)
        {
            _context.Ventas.Update(venta);
            await _context.SaveChangesAsync();
        }
        public async Task AgregarDetalleVentaSolicitudes(DetalleVentaSolicitudes detalle)
        {
            await _context.DetalleVentaSolicitudes.AddAsync(detalle);
            await _context.SaveChangesAsync();
        }
        public async Task AgregarDetalleVentaMontajes(DetalleVentaMontajes detalle)
        {
            await _context.DetalleVentaMontajes.AddAsync(detalle);
            await _context.SaveChangesAsync();
        }
        public async Task<ActionResult<IEnumerable<Ventas>>> ListaVentasPorCliente(string idUsuario) =>
           await _context.Ventas.Where(x => x.IdUsuario == idUsuario).ToListAsync();

        public async Task<ActionResult<IEnumerable<SalidaProductoInfo>>> listarSalidas(int idProducto)
        {
            await using (_context)
            {
                List<SalidaProductoInfo> listaSalidas = (from salida in _context.Salidas
                                             join usuario in _context.Usuarioidentity
                                             on salida.IdUsuario equals usuario.Id
                                             where salida.IdProducto == idProducto
                                             select new SalidaProductoInfo
                                             {
                                              IdSalida = salida.IdSalida,
                                              IdProducto = salida.IdProducto,
                                              Cantidad = salida.Cantidad,
                                              Fecha = salida.Fecha,
                                              IdUsuario = salida.IdUsuario,
                                              NombreUsuario = usuario.Nombres
                                             }).ToList();
                return listaSalidas;
            }
        }



    }
}
