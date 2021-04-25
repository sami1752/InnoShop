using Back.Clases.Solicitudes.CarritoDeCompras;
using Back.Clases.Solicitudes.Perzonalizada;
using Back.Models.Abstratos;
using Back.Models.Entidades.Productos;
using Back.Models.Entidades.Solicitudes;
using Back.Models.Entidades.Solicitudes.Personalizadas;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitudesController : ControllerBase
    {
        private readonly IServiciosSolicitudes _context;

        public SolicitudesController(IServiciosSolicitudes context) => _context = context;

        [HttpGet]
        [Route("CarritoDeCompras")]
        public async Task<ActionResult<IEnumerable<CarritoDeCompras>>> ObtenerCarritoDeCompras() =>
            await _context.ListarCarritoDeCompras();

        [HttpGet]
        [Route("CarritoDeComprasUsuario/{idUsuario}")]
        public async Task<CarritoDeCompras> BuscarCarritoDeComprasPorId(string idUsuario) =>
            await _context.BuscarCarritoDeComprasPorIdUsuario(idUsuario);

        [HttpPost]
        [Route("CarritoDeCompras")]
        public async Task<Object> RegistroCarritoDeCompras(CarritoDeCompras carritoDeCompras)
        {
            try
            {
                carritoDeCompras = await _context.AgregarCarritoDeCompras(carritoDeCompras);
                return Ok(new { mensaje = carritoDeCompras });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpPut]
        [Route("CarritoDeCompras")]
        public async Task<Object> EditarCarritoDeCompras(CarritoDeCompras carritoDeCompras)
        {
            try
            {
                await _context.EditarCarritoDeCompras(carritoDeCompras);
                return Ok(new { mensaje = "Actializacion exitosa" });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpGet]
        [Route("ListaDetalleCarritoDeCompras/{IdUsuario}")]
        public async Task<ActionResult<IEnumerable<DetalleCarritoDeComprasProducto>>> ObtenerDetalleCarritoDeCompras(string IdUsuario) =>
            await _context.ListarDetalleCarritoDeCompras(IdUsuario);

        [HttpGet]
        [Route("DetalleCarritoDeCompras/{idDetalleCarritoDeCompras}")]
        public async Task<ActionResult<DetalleCarritoDeCompras>> 
            BuscarDetalleCarritoDeComprasPorId(int idDetalleCarritoDeCompras) =>
            await _context.BuscarDetalleCarritoDeComprasPorId(idDetalleCarritoDeCompras);

        [HttpPost]
        [Route("DetalleCarritoDeCompras")]
        public async Task<Object> RegistroDetalleCarritoDeCompras(DetalleCarritoDeCompras DetalleCarritoDeCompras)
        {
            try
            {
                CarritoDeCompras carrito =  await _context.BuscarCarritoDeComprasPorId(DetalleCarritoDeCompras.IdCarritoDeCompras);
                PrecioProducto precioP = await _context.PrecioDelProducto(DetalleCarritoDeCompras.IdProducto);
                carrito.Valor += precioP.Precio * DetalleCarritoDeCompras.Cantidad;
                await _context.EditarCarritoDeCompras(carrito);

                DetalleCarritoDeCompras = await _context.AgregarDetalleCarritoDeCompras(DetalleCarritoDeCompras);
                return Ok(new { mensaje = DetalleCarritoDeCompras });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpPut]
        [Route("DetalleCarritoDeCompras/{cantAnterior}")]
        public async Task<Object> EditarDetalleCarritoDeCompras(DetalleCarritoDeCompras DetalleCarritoDeCompras, int cantAnterior)
        {
            try
            {
                await _context.EditarDetalleCarritoDeCompras(DetalleCarritoDeCompras);
                CarritoDeCompras carrito = await _context.BuscarCarritoDeComprasPorId(DetalleCarritoDeCompras.IdCarritoDeCompras);
                PrecioProducto precioP = await _context.PrecioDelProducto(DetalleCarritoDeCompras.IdProducto);

                carrito.Valor += (precioP.Precio * DetalleCarritoDeCompras.Cantidad) -(cantAnterior* precioP.Precio);
                await _context.EditarCarritoDeCompras(carrito);
                

                return Ok(new { mensaje = "Actializacion exitosa" });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        [HttpGet]
        [Route("DetalleCarritoCantidadAnterior/{id}")]
        public async Task<Object> DetalleCarritoCantidadAnterior(int id)
        {
            try
            {
               int cantidad= await _context.CantidadDetalleCarritoAnterior(id);
                return Ok(cantidad);
            }
            catch (Exception)
            {

                throw;
            }
        }


        [HttpGet]
        [Route("DetalleEstadosMontajes")]
        public async Task<ActionResult<IEnumerable<DetalleEstadosMontajes>>> ListarDetalleEstadosMontajes() =>
            await _context.ListarDetalleEstadosMontajes();

        [HttpGet]
        [Route("DetalleEstadosMontajes/{idDetalleEstadosMontajes}")]
        public async Task<ActionResult<IEnumerable<DetalleEstadosMontajes>>> 
            ListaDetalleEstadosMontajes(int DetalleEstadosMontajes) =>
            await _context.ListaDetalleEstadosMontajes(DetalleEstadosMontajes);


        [HttpPost]
        [Route("DetalleEstadosMontajes")]
        public async Task<Object> AgregarDetalleEstadosMontajes(DetalleEstadosMontajes DetalleEstadosMontajes)
        {
            try
            {
                DetalleEstadosMontajes = await _context.AgregarDetalleEstadosMontajes(DetalleEstadosMontajes);
                return Ok(new { mensaje = DetalleEstadosMontajes });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }


        [HttpGet]
        [Route("DetalleEstadosProductosPersoanlizados")]
        public async Task<ActionResult<IEnumerable<DetalleEstadosProductosPersoanlizados>>>
            ListarDetalleEstadosProductosPersoanlizados() =>
            await _context.ListarDetalleEstadosProductosPersoanlizados();

        [HttpGet]
        [Route("DetalleEstadosProductosPersoanlizados/{DetalleEstadosProductosPersoanlizados}")]
        public async Task<ActionResult<IEnumerable<DetalleEstadosProductosPersoanlizados>>>
            ListaDetalleEstadosProductosPersoanlizados(int DetalleEstadosProductosPersoanlizados) =>
            await _context.ListaDetalleEstadosProductosPersoanlizados(DetalleEstadosProductosPersoanlizados);

        [HttpPost]
        [Route("DetalleEstadosProductosPersoanlizados")]
        public async Task<Object> AgregarDetalleEstadosProductosPersoanlizados
            (DetalleEstadosProductosPersoanlizados DetalleEstadosProductosPersoanlizados)
        {
            try
            {
                DetalleEstadosProductosPersoanlizados =
                    await _context.AgregarDetalleEstadosProductosPersoanlizados(DetalleEstadosProductosPersoanlizados);
                return Ok(new { mensaje = DetalleEstadosProductosPersoanlizados });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }



        [HttpGet]
        [Route("DetalleEstadosSolicitudPersonalizada")]
        public async Task<ActionResult<IEnumerable<DetalleEstadosSolicitudPersonalizada>>>
           ListarDetalleEstadosSolicitudPersonalizada() =>
           await _context.ListarDetalleEstadosSolicitudPersonalizada();

        [HttpGet]
        [Route("DetalleEstadosSolicitudPersonalizada/{DetalleEstadosSolicitudPersonalizada}")]
        public async Task<ActionResult<IEnumerable<DetalleEstadosSolicitudPersonalizada>>>
            ListaDetalleEstadosSolicitudPersonalizada(int DetalleEstadosSolicitudPersonalizada) =>
            await _context.ListaDetalleEstadosSolicitudPersonalizada(DetalleEstadosSolicitudPersonalizada);

        [HttpPost]
        [Route("DetalleEstadosSolicitudPersonalizada")]
        public async Task<Object> AgregarDetalleEstadosSolicitudPersonalizada
            (DetalleEstadosSolicitudPersonalizada DetalleEstadosSolicitudPersonalizada)
        {
            try
            {
                DetalleEstadosSolicitudPersonalizada =
                    await _context.AgregarDetalleEstadosSolicitudPersonalizada(DetalleEstadosSolicitudPersonalizada);
                return Ok(new { mensaje = DetalleEstadosSolicitudPersonalizada });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }



        [HttpDelete]
        [Route("DetalleProductosSolicitud/{DetalleProductosSolicitud}")]
        public async Task<Object> EliminarDetalleProductosSolicitud(int DetalleProductosSolicitud)
        {
            try
            {
                await _context.EliminarDetalleProductosSolicitud(DetalleProductosSolicitud);
                return Ok(new { mensaje = "Eliminación Exitosa" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("DetalleProductosSolicitud")]
        public async Task<ActionResult<IEnumerable<DetalleProductosSolicitud>>>
        ListarDetalleProductosSolicitud() =>
            await _context.ListarDetalleProductosSolicitud();

        [HttpGet]
        [Route("DetalleProductosSolicitud/{DetalleProductosSolicitud}")]
        public async Task<ActionResult<IEnumerable<DetalleProductosSolicitud>>>
            ListaDetalleProductosSolicitud(int DetalleProductosSolicitud) =>
            await _context.ListaDetalleProductosSolicitud(DetalleProductosSolicitud);

        [HttpPost]
        [Route("DetalleProductosSolicitud")]
        public async Task<Object> AgregarDetalleProductosSolicitud
            (DetalleProductosSolicitud DetalleProductosSolicitud)
        {
            try
            {
                DetalleProductosSolicitud =
                    await _context.AgregarDetalleProductosSolicitud(DetalleProductosSolicitud);
                return Ok(new { mensaje = DetalleProductosSolicitud });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }


        [HttpDelete]
        [Route("DetalleProductosSolicitud/{DetalleProductosSolicitud}")]
        public async Task<Object> EliminarDetallesMaterialesMontajes(int DetallesMaterialesMontajes)
        {
            try
            {
                await _context.EliminarDetallesMaterialesMontajes(DetallesMaterialesMontajes);
                return Ok(new { mensaje = "Eliminación Exitosa" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("DetallesMaterialesMontajes")]
        public async Task<ActionResult<IEnumerable<DetallesMaterialesMontajes>>>
        ListarDetallesMaterialesMontajes() =>
            await _context.ListarDetallesMaterialesMontajes();

        [HttpGet]
        [Route("DetallesMaterialesMontajes/{DetallesMaterialesMontajes}")]
        public async Task<ActionResult<IEnumerable<DetallesMaterialesMontajes>>>
            ListaDetallesMaterialesMontajes(int DetallesMaterialesMontajes) =>
            await _context.ListaDetallesMaterialesMontajes(DetallesMaterialesMontajes);

        [HttpPost]
        [Route("DetallesMaterialesMontajes")]
        public async Task<Object> AgregarDetallesMaterialesMontajes
            (DetallesMaterialesMontajes DetallesMaterialesMontajes)
        {
            try
            {
                DetallesMaterialesMontajes =
                    await _context.AgregarDetallesMaterialesMontajes(DetallesMaterialesMontajes);
                return Ok(new { mensaje = DetallesMaterialesMontajes });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpDelete]
        [Route("DetallesMaterialesSolicitudesPersonalizadas/{DetallesMaterialesSolicitudesPersonalizadas}")]
        public async Task<Object> EliminarDetallesMaterialesSolicitudesPersonalizadas
            (int DetallesMaterialesSolicitudesPersonalizadas)
        {
            try
            {
                await _context.EliminarDetallesMaterialesSolicitudesPersonalizadas
                    (DetallesMaterialesSolicitudesPersonalizadas);
                return Ok(new { mensaje = "Eliminación Exitosa" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("DetallesMaterialesSolicitudesPersonalizadas")]
        public async Task<ActionResult<IEnumerable<DetallesMaterialesSolicitudesPersonalizadas>>>
        ListarDetallesMaterialesSolicitudesPersonalizadas() =>
            await _context.ListarDetallesMaterialesSolicitudesPersonalizadas();

        [HttpGet]
        [Route("DetallesMaterialesSolicitudesPersonalizadas/{DetallesMaterialesSolicitudesPersonalizadas}")]
        public async Task<ActionResult<IEnumerable<DetallesMaterialesSolicitudesPersonalizadas>>>
            ListaDetallesMaterialesSolicitudesPersonalizadas(int DetallesMaterialesSolicitudesPersonalizadas) =>
            await _context.ListaDetallesMaterialesSolicitudesPersonalizadas(DetallesMaterialesSolicitudesPersonalizadas);

        [HttpPost]
        [Route("DetallesMaterialesSolicitudesPersonalizadas")]
        public async Task<Object> AgregarDetallesMaterialesSolicitudesPersonalizadas
            (DetallesMaterialesSolicitudesPersonalizadas DetallesMaterialesSolicitudesPersonalizadas)
        {
            try
            {
                DetallesMaterialesSolicitudesPersonalizadas =
                    await _context.AgregarDetallesMaterialesSolicitudesPersonalizadas
                    (DetallesMaterialesSolicitudesPersonalizadas);
                return Ok(new { mensaje = DetallesMaterialesSolicitudesPersonalizadas });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }


        [HttpDelete]
        [Route("DetallesProductosMontajes/{DetallesProductosMontajes}")]
        public async Task<Object> EliminarDetallesProductosMontajes(int DetallesProductosMontajes)
        {
            try
            {
                await _context.EliminarDetallesProductosMontajes(DetallesProductosMontajes);
                return Ok(new { mensaje = "Eliminación Exitosa" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("DetallesProductosMontajes")]
        public async Task<ActionResult<IEnumerable<DetallesProductosMontajes>>> ListarDetallesProductosMontajes() =>  
            await _context.ListarDetallesProductosMontajes();

        [HttpGet]
        [Route("DetallesProductosMontajes/{DetallesProductosMontajes}")]
        public async Task<ActionResult<IEnumerable<DetallesProductosMontajes>>>
            ListaDetallesProductosMontajes(int DetallesProductosMontajes) =>
            await _context.ListaDetallesProductosMontajes(DetallesProductosMontajes);

        [HttpPost]
        [Route("DetallesProductosMontajes")]
        public async Task<Object> AgregarDetallesProductosMontajes (DetallesProductosMontajes DetallesProductosMontajes)
        {
            try
            {
                DetallesProductosMontajes = await _context.AgregarDetallesProductosMontajes (DetallesProductosMontajes);
                return Ok(new { mensaje = DetallesProductosMontajes });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }


        [HttpGet]
        [Route("Montajes")]
        public async Task<ActionResult<IEnumerable<Montajes>>> ListarMontajes() => await _context.ListarMontajes();


        [HttpGet]
        [Route("MisMontajes/{id}")]
        public async Task<ActionResult<IEnumerable<Montajes>>> ListarMisMontajes(string id) =>
            await _context.ListarMisMontajes(id);

        [HttpGet]
        [Route("Montajes/{Montajes}")]
        public async Task<ActionResult<Montajes>> BuscarMontajes(int Montajes)=>await _context.BuscarMontajes(Montajes);

        [HttpPost]
        [Route("Montajes")]
        public async Task<Object> AgregarMontajes(Montajes Montajes)
        {
            try
            {
                Montajes = await _context.AgregarMontajes(Montajes);
                return Ok(new { mensaje = Montajes });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpPut]
        [Route("Montajes")]
        public async Task<Object> EditarMontajes(Montajes Montajes)
        {
            try
            {
                await _context.EditarMontajes(Montajes);
                return Ok(new { mensaje = "Actializacion exitosa" });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }


        [HttpGet]
        [Route("PrecioMontajes")]
        public async Task<ActionResult<IEnumerable<PrecioMontajes>>> ListarPrecioMontajes() => 
            await _context.ListarPrecioMontajes();

        [HttpGet]
        [Route("PrecioMontajes/{PrecioMontajes}")]
        public async Task<ActionResult<IEnumerable<PrecioMontajes>>> ListaPrecioMontajes(int PrecioMontajes) =>
            await _context.ListaPrecioMontajes(PrecioMontajes);

        [HttpPost]
        [Route("PrecioMontajes")]
        public async Task<Object> AgregarPrecioMontajes(PrecioMontajes PrecioMontajes)
        {
            try
            {
                PrecioMontajes = await _context.AgregarPrecioMontajes(PrecioMontajes);
                return Ok(new { mensaje = PrecioMontajes });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpGet]
        [Route("RespuestasSolicitudesPersonalizadas/{RespuestasSolicitudesPersonalizadas}")]
        public async Task<ActionResult<IEnumerable<RespuestasSolicitudesPersonalizadas>>> 
            ListaRespuestasSolicitudesPersonalizadas(int RespuestasSolicitudesPersonalizadas) =>
            await _context.ListaRespuestasSolicitudesPersonalizadas(RespuestasSolicitudesPersonalizadas);

        [HttpPost]
        [Route("RespuestasSolicitudesPersonalizadas")]
        public async Task<Object> AgregarRespuestasSolicitudesPersonalizadas
            (RespuestasSolicitudesPersonalizadas RespuestasSolicitudesPersonalizadas)
        {
            try
            {
                RespuestasSolicitudesPersonalizadas = 
                    await _context.AgregarRespuestasSolicitudesPersonalizadas(RespuestasSolicitudesPersonalizadas);
                return Ok(new { mensaje = RespuestasSolicitudesPersonalizadas });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }



        [HttpGet]
        [Route("SolicitudPersonalizada")]
        public async Task<ActionResult<IEnumerable<SolicitudPersonalizadaDetalle>>> ListarSolicitudPersonalizada() => 
            await _context.ListarSolicitudPersonalizada();

        [HttpGet]
        [Route("MisSolicitudPersonalizada/{id}")]
        public async Task<ActionResult<IEnumerable<SolicitudPersonalizadaDetalle>>> ListarMisSolicitudPersonalizada(string id) =>
            await _context.ListarMisSolicitudPersonalizada(id);

        [HttpGet]
        [Route("SolicitudPersonalizada/{SolicitudPersonalizada}")]
        public ActionResult<SolicitudPersonalizadaDetalle> BuscarSolicitudPersonalizada(int SolicitudPersonalizada) =>
             _context.BuscarSolicitudPersonalizada(SolicitudPersonalizada);

        [HttpPost]
        [Route("SolicitudPersonalizada")]
        public async Task<Object> AgregarSolicitudPersonalizada(SolicitudPersonalizada SolicitudPersonalizada)
        {
            try
            {
                SolicitudPersonalizada = await _context.AgregarSolicitudPersonalizada(SolicitudPersonalizada);
                return Ok(new { mensaje = SolicitudPersonalizada });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpPut]
        [Route("SolicitudPersonalizada")]
        public async Task<Object> EditarSolicitudPersonalizada(SolicitudPersonalizada SolicitudPersonalizada)
        {
            try
            {
                await _context.EditarSolicitudPersonalizada(SolicitudPersonalizada);
                return Ok(new { mensaje = "Actializacion exitosa" });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpGet]
        [Route("ExisteCarrito/{idUsuario}")]
        public async Task<Object> ExisteCarrito(string idUsuario)
        {
            try
            {
                var carrito = await _context.ExisteCarritoUsuarioPorId(idUsuario);

                if (carrito.Count() == 0)
                {
                    return Ok(new { mensaje = 0 });
                }
                else
                {
                    return Ok(new { mensaje = carrito[0].IdCarritoDeCompras });
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpDelete]
        [Route("EliminarDetalle/{idDetalle}")]
        public async Task<Object> EliminarDetalleCarrito(int idDetalle)
        {
            try
            {
                DetalleCarritoDeCompras DetalleCarritoDeCompras = await _context.BuscarDetalleCarritoDeComprasPorId(idDetalle);
                CarritoDeCompras carrito = await _context.BuscarCarritoDeComprasPorId(DetalleCarritoDeCompras.IdCarritoDeCompras);
                PrecioProducto precioP = await _context.PrecioDelProducto(DetalleCarritoDeCompras.IdProducto);
                carrito.Valor -= precioP.Precio * DetalleCarritoDeCompras.Cantidad;
                await _context.EditarCarritoDeCompras(carrito);

                await _context.EliminarDetalleCarrito(idDetalle);
                return Ok(new { mensaje = "Eliminacion exitosa" });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}
