using Back.Clases.Solicitudes.CarritoDeCompras;
using Back.Models.Abstratos;
using Back.Models.DAL;
using Back.Models.Entidades.Productos;
using Back.Models.Entidades.Solicitudes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Servicios
{
    public class ServiciosSolicitudes : IServiciosSolicitudes
    {
        private readonly DBContext _context;

        public ServiciosSolicitudes(DBContext context) => _context = context;

        public async Task<ActionResult<IEnumerable<CarritoDeCompras>>> ListarCarritoDeCompras() => await _context.CarritoDeCompras.ToListAsync(); 

        public async Task<CarritoDeCompras> BuscarCarritoDeComprasPorId(int id) => await _context.CarritoDeCompras.FindAsync(id);

        public async Task<CarritoDeCompras> AgregarCarritoDeCompras(CarritoDeCompras carritoDeCompras)
        {
            carritoDeCompras.Fecha = DateTime.Now;
            _context.CarritoDeCompras.Add(carritoDeCompras);
            await _context.SaveChangesAsync();
            return carritoDeCompras;
        }

        public async Task<CarritoDeCompras> EditarCarritoDeCompras(CarritoDeCompras carritoDeCompras)
        {
            _context.CarritoDeCompras.Update(carritoDeCompras);
            await _context.SaveChangesAsync();
            return carritoDeCompras;
        }

        public async Task<ActionResult<IEnumerable<DetalleCarritoDeComprasProducto>>> ListarDetalleCarritoDeCompras(string idUsuario)
        {
            await using (_context)
            {
                List<DetalleCarritoDeComprasProducto> listaDetalleCarrito = (from productos in _context.Productos
                                                                             join detalleCarrito in _context.DetalleCarritoDeCompras
                                                                             on productos.IdProducto equals detalleCarrito.IdProducto
                                                                             where detalleCarrito.IdUsuario == idUsuario

                                                                             select new DetalleCarritoDeComprasProducto()
                                                                             {
                                                                               IdDetalleCarritoDeCompras = detalleCarrito.IdDetalleCarritoDeCompras,
                                                                               IdCarritoDeCompras=detalleCarrito.IdCarritoDeCompras,
                                                                               IdProducto = detalleCarrito.IdProducto,
                                                                               NombreProducto = productos.Nombre,
                                                                               IdUsuario = detalleCarrito.IdUsuario,
                                                                               Cantidad = detalleCarrito.Cantidad
                                                                             }).ToList();
                return listaDetalleCarrito;
            }
        }
        

        public async Task<DetalleCarritoDeCompras> BuscarDetalleCarritoDeComprasPorId(int id) => await _context.DetalleCarritoDeCompras.FindAsync(id);

        public async Task<DetalleCarritoDeCompras> AgregarDetalleCarritoDeCompras(DetalleCarritoDeCompras detalleCarritoDeCompras)
        {

            _context.DetalleCarritoDeCompras.Add(detalleCarritoDeCompras);
            await _context.SaveChangesAsync();
            return detalleCarritoDeCompras;
        }

        public async Task<DetalleCarritoDeCompras> EditarDetalleCarritoDeCompras(DetalleCarritoDeCompras detalleCarritoDeCompras)
        {
            _context.DetalleCarritoDeCompras.Update(detalleCarritoDeCompras);
            await _context.SaveChangesAsync();
            return detalleCarritoDeCompras;
        }

        public async Task<List<CarritoDeCompras>> ExisteCarritoUsuarioPorId(string id)
        {
            await using (_context)
            {
                List<CarritoDeCompras>  carritoAsociado = (from carrito in _context.CarritoDeCompras
                                                          where carrito.IdUsuario == id && carrito.Estado ==false
                                                          select carrito).ToList();
                return carritoAsociado;
            }

        }
        public async Task EliminarDetalleCarrito(int idDetalle)
        {
           var detalle= await _context.DetalleCarritoDeCompras.FindAsync(idDetalle);
            _context.DetalleCarritoDeCompras.Remove(detalle);
            await _context.SaveChangesAsync();
        }

        public async Task<PrecioProducto> PrecioDelProducto(int idProducto)
        {
            var listaPrecios =  await _context.PrecioProductos.Where(x => x.IdProducto == idProducto).ToListAsync();
            return listaPrecios[listaPrecios.Count()-1];
        }
    }
}
