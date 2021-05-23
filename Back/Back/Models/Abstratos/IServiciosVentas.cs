using Back.Clases.Ventas;
using Back.Models.Entidades.Productos;
using Back.Models.Entidades.Ventas;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Abstratos
{
    public interface IServiciosVentas
    {
        Task<ActionResult<IEnumerable<DetalleVenta>>> ListarVentas();
        Task<Ventas> ObtenerVentaPorId(int idVenta);
        Task<ActionResult<IEnumerable<DetalleVentaProductoInfo>>> ListarDetalleVentaProductos(int idVenta);
        Task<ActionResult<IEnumerable<DetalleVentaSolicitudes>>> ListarDetalleVentaSolicitudes(int idVenta);
        Task<ActionResult<IEnumerable<DetalleVentaMontajes>>> ListarDetalleVentaMontajes(int idVenta);
        Task<DetalleVenta> DetalleVenta(int idVenta);
        Task<Ventas> AgregarVenta(Ventas venta);
        Task AgregarSalidaProducto(Salida salida);
        Task<Iva> ObtenerIvaActual();
        Task<PrecioProducto> ObtenerPrecioProducto(int idProducto);
        Task ModificarValorTotalVentas(Ventas venta);
        Task AgregarDetalleVentaProducto(DetalleVentaProductos detalle);
        Task AgregarDetalleVentaSolicitudes(DetalleVentaSolicitudes detalle);
        Task AgregarDetalleVentaMontajes(DetalleVentaMontajes detalle);
        Task<ActionResult<IEnumerable<Ventas>>> ListaVentasPorCliente(string idUsuario);
    }
}
