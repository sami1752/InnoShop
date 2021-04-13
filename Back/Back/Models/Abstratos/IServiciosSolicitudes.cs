using Back.Clases.Solicitudes.CarritoDeCompras;
using Back.Models.Entidades.Productos;
using Back.Models.Entidades.Solicitudes;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Abstratos
{
    public interface IServiciosSolicitudes
    {
        Task<ActionResult<IEnumerable<CarritoDeCompras>>> ListarCarritoDeCompras();
        Task<CarritoDeCompras> BuscarCarritoDeComprasPorId(int id);
        Task<CarritoDeCompras> AgregarCarritoDeCompras(CarritoDeCompras carritoDeCompras);
        Task<CarritoDeCompras> EditarCarritoDeCompras(CarritoDeCompras carritoDeCompras);
        Task<PrecioProducto> PrecioDelProducto(int idProducto);
        Task<ActionResult<IEnumerable<DetalleCarritoDeComprasProducto>>> ListarDetalleCarritoDeCompras(string idUsuario);
        Task<DetalleCarritoDeCompras> BuscarDetalleCarritoDeComprasPorId(int id);
        Task<DetalleCarritoDeCompras> AgregarDetalleCarritoDeCompras(DetalleCarritoDeCompras detalleCarritoDeCompras);
        Task<DetalleCarritoDeCompras> EditarDetalleCarritoDeCompras(DetalleCarritoDeCompras detalleCarritoDeCompras);
        Task<List<CarritoDeCompras>> ExisteCarritoUsuarioPorId(string id);
        Task EliminarDetalleCarrito(int idDetalle);
    }
}
