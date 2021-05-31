using Back.Clases.Solicitudes.CarritoDeCompras;
using Back.Clases.Solicitudes.Perzonalizada;
using Back.Models.Entidades.Productos;
using Back.Models.Entidades.Solicitudes;
using Back.Models.Entidades.Solicitudes.Personalizadas;
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
        Task<CarritoDeCompras> BuscarCarritoDeComprasPorIdUsuario(string id);
        Task<CarritoDeCompras> BuscarCarritoDeComprasPorId(int id);
        Task<CarritoDeCompras> AgregarCarritoDeCompras(CarritoDeCompras carritoDeCompras);
        Task<CarritoDeCompras> EditarCarritoDeCompras(CarritoDeCompras carritoDeCompras);
        Task<PrecioProducto> PrecioDelProducto(int idProducto);
        Task<ActionResult<IEnumerable<DetalleCarritoDeComprasProducto>>> ListarDetalleCarritoDeCompras(string idUsuario);
        Task<DetalleCarritoDeCompras> BuscarDetalleCarritoDeComprasPorId(int id);
        Task<DetalleCarritoDeCompras> AgregarDetalleCarritoDeCompras(DetalleCarritoDeCompras detalleCarritoDeCompras);
        Task EditarDetalleCarritoDeCompras(DetalleCarritoDeCompras detalleCarritoDeCompras);
        Task<int> CantidadDetalleCarritoAnterior(int IdDetalleCarritoDeCompras);

        //--------
        Task<DetalleEstadosMontajes> AgregarDetalleEstadosMontajes (DetalleEstadosMontajes DetalleEstadosMontajes, bool nueva);
        Task<ActionResult<IEnumerable<DetalleEstadosMontajes>>> ListarDetalleEstadosMontajes();
        Task<ActionResult<IEnumerable<DetalleEstadosMontajes>>> ListaDetalleEstadosMontajes(int id);
        Task<DetalleEstadosSolicitudPersonalizada> AgregarDetalleEstadosSolicitudPersonalizada
                    (DetalleEstadosSolicitudPersonalizada DetalleEstadosSolicitudPersonalizada, bool nueva);
        Task<ActionResult<IEnumerable<DetalleEstadosSolicitudPersonalizada>>>
                    ListarDetalleEstadosSolicitudPersonalizada();
        Task<ActionResult<IEnumerable<DetalleEstadosSolicitudPersonalizada>>>
                    ListaDetalleEstadosSolicitudPersonalizada(int id);
        Task<DetalleProductosSolicitud> AgregarDetalleProductosSolicitud
                    (DetalleProductosSolicitud DetalleProductosSolicitud);
        Task<ActionResult<IEnumerable<DetalleProductosSolicitud>>> ListarDetalleProductosSolicitud();
        Task<ActionResult<IEnumerable<DetalleProductosSolicitud>>> ListaDetalleProductosSolicitud(int id);
        Task EliminarDetalleProductosSolicitud(int id);
        Task<DetallesProductosMontajes> AgregarDetallesProductosMontajes
                    (DetallesProductosMontajes DetallesProductosMontajes);
        Task<ActionResult<IEnumerable<DetallesProductosMontajes>>> ListarDetallesProductosMontajes();
        Task<ActionResult<IEnumerable<DetallesProductosMontajes>>> ListaDetallesProductosMontajes(int id);
        Task EliminarDetallesProductosMontajes(int id);
        Task<ActionResult<IEnumerable<MontajeDetalle>>> ListarMontajes();
        Task<ActionResult<IEnumerable<MontajeDetalle>>> ListarMisMontajes(string id);
        Task<MontajeDetalle> BuscarMontajes(int id);
        Task<Montajes> AgregarMontajes(Montajes Montajes);
        Task<Montajes> EditarMontajes(Montajes Montajes);
        Task<RespuestasSolicitudesPersonalizadas> AgregarRespuestasSolicitudesPersonalizadas
                    (RespuestasSolicitudesPersonalizadas RespuestasSolicitudesPersonalizadas);
        Task<ActionResult<IEnumerable<DetalleRespuestasSolicitudP>>>
                    ListaRespuestasSolicitudesPersonalizadas(int id);
        Task<RespuestasMontajes> AgregarRespuestasMontajes
            (RespuestasMontajes RespuestasMontajes);
        Task<ActionResult<IEnumerable<DetalleRespuestasM>>>
                    ListaRespuestasMontajes(int id);
        Task<ActionResult<IEnumerable<SolicitudPersonalizadaDetalle>>> ListarSolicitudPersonalizada();
        Task<ActionResult<IEnumerable<SolicitudPersonalizadaDetalle>>> ListarMisSolicitudPersonalizada(string id);
        SolicitudPersonalizadaDetalle BuscarSolicitudPersonalizada(int id);    
        Task<SolicitudPersonalizada> AgregarSolicitudPersonalizada(SolicitudPersonalizada SolicitudPersonalizada);
        Task<SolicitudPersonalizada> EditarSolicitudPersonalizada(SolicitudPersonalizada SolicitudPersonalizada);
        Task<List<CarritoDeCompras>> ExisteCarritoUsuarioPorId(string id);
        Task EliminarDetalleCarrito(int idDetalle);
        Task<Estados> AgregarEstado(Estados Estados);
    }
}
