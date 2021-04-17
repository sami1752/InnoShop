using Back.Clases.Solicitudes.CarritoDeCompras;
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
        Task<ActionResult<IEnumerable<DetalleCarritoDeCompras>>> ListarTodosDetalleCarritoDeCompras();
        Task<ActionResult<IEnumerable<DetalleCarritoDeComprasProducto>>> ListarDetalleCarritoDeCompras(string idUsuario);
        Task<DetalleCarritoDeCompras> BuscarDetalleCarritoDeComprasPorId(int id);
        Task<DetalleCarritoDeCompras> AgregarDetalleCarritoDeCompras(DetalleCarritoDeCompras detalleCarritoDeCompras);
        Task EditarDetalleCarritoDeCompras(DetalleCarritoDeCompras detalleCarritoDeCompras);
        Task<int> CantidadDetalleCarritoAnterior(int IdDetalleCarritoDeCompras);

//--------
        Task<DetalleEstadosMontajes> AgregarDetalleEstadosMontajes(DetalleEstadosMontajes DetalleEstadosMontajes);
        Task<ActionResult<IEnumerable<DetalleEstadosMontajes>>> ListarDetalleEstadosMontajes();
        Task<ActionResult<IEnumerable<DetalleEstadosMontajes>>> ListaDetalleEstadosMontajes(int id);

        Task<DetalleEstadosProductosPersoanlizados> AgregarDetalleEstadosProductosPersoanlizados
                    (DetalleEstadosProductosPersoanlizados DetalleEstadosProductosPersoanlizados);
        Task<ActionResult<IEnumerable<DetalleEstadosProductosPersoanlizados>>>
                    ListarDetalleEstadosProductosPersoanlizados();
        Task<ActionResult<IEnumerable<DetalleEstadosProductosPersoanlizados>>>
                    ListaDetalleEstadosProductosPersoanlizados(int id);

        Task<DetalleEstadosSolicitudPersonalizada> AgregarDetalleEstadosSolicitudPersonalizada
                    (DetalleEstadosSolicitudPersonalizada DetalleEstadosSolicitudPersonalizada);
        Task<ActionResult<IEnumerable<DetalleEstadosSolicitudPersonalizada>>>
                    ListarDetalleEstadosSolicitudPersonalizada();
        Task<ActionResult<IEnumerable<DetalleEstadosSolicitudPersonalizada>>>
                    ListaDetalleEstadosSolicitudPersonalizada(int id);

        Task<DetalleProductosSolicitud> AgregarDetalleProductosSolicitud
                    (DetalleProductosSolicitud DetalleProductosSolicitud);
        Task<ActionResult<IEnumerable<DetalleProductosSolicitud>>> ListarDetalleProductosSolicitud();
        Task<ActionResult<IEnumerable<DetalleProductosSolicitud>>> ListaDetalleProductosSolicitud(int id);
        Task EliminarDetalleProductosSolicitud(int id);
       
        Task<DetallesMaterialesMontajes> AgregarDetallesMaterialesMontajes
                    (DetallesMaterialesMontajes DetallesMaterialesMontajes);
        Task<ActionResult<IEnumerable<DetallesMaterialesMontajes>>> ListarDetallesMaterialesMontajes();
        Task<ActionResult<IEnumerable<DetallesMaterialesMontajes>>> ListaDetallesMaterialesMontajes(int id);
        Task EliminarDetallesMaterialesMontajes(int id);

        Task<DetallesMaterialesSolicitudesPersonalizadas> AgregarDetallesMaterialesSolicitudesPersonalizadas
                    (DetallesMaterialesSolicitudesPersonalizadas DetallesMaterialesSolicitudesPersonalizadas);
        Task<ActionResult<IEnumerable<DetallesMaterialesSolicitudesPersonalizadas>>>
                    ListarDetallesMaterialesSolicitudesPersonalizadas();
        Task<ActionResult<IEnumerable<DetallesMaterialesSolicitudesPersonalizadas>>>
                    ListaDetallesMaterialesSolicitudesPersonalizadas(int id);
        Task EliminarDetallesMaterialesSolicitudesPersonalizadas(int id);

        Task<DetallesProductosMontajes> AgregarDetallesProductosMontajes
                    (DetallesProductosMontajes DetallesProductosMontajes);
        Task<ActionResult<IEnumerable<DetallesProductosMontajes>>> ListarDetallesProductosMontajes();
        Task<ActionResult<IEnumerable<DetallesProductosMontajes>>> ListaDetallesProductosMontajes(int id);
        Task EliminarDetallesProductosMontajes(int id);

        Task<ActionResult<IEnumerable<Montajes>>> ListarMontajes();
        Task<Montajes> BuscarMontajes(int id);
        Task<Montajes> AgregarMontajes(Montajes Montajes);
        Task<Montajes> EditarMontajes(Montajes Montajes);
   
        Task<PrecioMontajes> AgregarPrecioMontajes(PrecioMontajes PrecioMontajes);
        Task<ActionResult<IEnumerable<PrecioMontajes>>> ListarPrecioMontajes();
        Task<ActionResult<IEnumerable<PrecioMontajes>>> ListaPrecioMontajes(int id);
        
        
        

        Task<RespuestasSolicitudesPersonalizadas> AgregarRespuestasSolicitudesPersonalizadas
                    (RespuestasSolicitudesPersonalizadas RespuestasSolicitudesPersonalizadas);
        Task<ActionResult<IEnumerable<RespuestasSolicitudesPersonalizadas>>>
                    ListaRespuestasSolicitudesPersonalizadas(int id);
       
        
        
        Task<ActionResult<IEnumerable<SolicitudPersonalizada>>> ListarSolicitudPersonalizada();
        Task<SolicitudPersonalizada> BuscarSolicitudPersonalizada(int id);    
        Task<SolicitudPersonalizada> AgregarSolicitudPersonalizada(SolicitudPersonalizada SolicitudPersonalizada);
        Task<SolicitudPersonalizada> EditarSolicitudPersonalizada(SolicitudPersonalizada SolicitudPersonalizada);


        Task<List<CarritoDeCompras>> ExisteCarritoUsuarioPorId(string id);
        Task EliminarDetalleCarrito(int idDetalle);
    }
}
