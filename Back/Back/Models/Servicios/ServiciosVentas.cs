using Back.Clases.Ventas;
using Back.Models.Abstratos;
using Back.Models.DAL;
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
                                                  join iva in _context.Iva on venta.IdIva equals iva.IdIva
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
                                                      TotalIva = venta.TotalIva,
                                                      SubTotal = venta.SubTotal
                                                      
                                                  }).ToList();
                return listaVentas;
            }
        }
        public async Task<DetalleVenta> DetalleVenta(int idVenta)
        {
            await using (_context)
            {
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
                                                      ValorDescuento = porcentaje.Porcentaje == 0 ? 0 : venta.Total * (porcentaje.Porcentaje / 100),
                                                      PorcentajeDescuento = porcentaje.Porcentaje,
                                                      Total = venta.Total,
                                                      IdIva = venta.IdIva,
                                                      ValorIva = iva.Porcentaje,
                                                      TotalIva = venta.TotalIva,
                                                      SubTotal = venta.SubTotal

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
            await _context.Ventas.AddAsync(venta);
            await _context.SaveChangesAsync();
            return venta;
        }
        public async Task AgregarDetalleVentaProducto(DetalleVentaProductos detalle)
        {
            await _context.DetalleVentaProductos.AddAsync(detalle);
            await _context.SaveChangesAsync();
            var venta = await this.ObtenerVentaPorId(detalle.IdVenta);
            var precio = await this.ObtenerPrecioProducto(detalle.IdProducto);
            var iva = await this.ObtenerIvaActual();
            venta.IdIva = iva.IdIva;
            venta.SubTotal += detalle.Cantidad * precio.Precio;
            venta.TotalIva = venta.SubTotal * (iva.Porcentaje / 100);
            venta.Total = venta.SubTotal + venta.TotalIva;
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





    }
}
