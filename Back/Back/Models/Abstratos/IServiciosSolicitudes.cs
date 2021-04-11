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
        Task<ActionResult<IEnumerable<DetalleCarritoDeCompras>>> ListarDetalleCarritoDeCompras();
        Task<DetalleCarritoDeCompras> BuscarDetalleCarritoDeComprasPorId(int id);
        Task<DetalleCarritoDeCompras> AgregarDetalleCarritoDeCompras(DetalleCarritoDeCompras detalleCarritoDeCompras);
        Task<DetalleCarritoDeCompras> EditarDetalleCarritoDeCompras(DetalleCarritoDeCompras detalleCarritoDeCompras);
    }
}
