﻿using Back.Models.Abstratos;
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
        [Route("CarritoDeCompras/{idCarritoDeCompras}")]
        public async Task<ActionResult<CarritoDeCompras>> BuscarCarritoDeComprasPorId(int idCarritoDeCompras) =>
            await _context.BuscarCarritoDeComprasPorId(idCarritoDeCompras);

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
        [Route("DetalleCarritoDeCompras")]
        public async Task<ActionResult<IEnumerable<DetalleCarritoDeCompras>>> ObtenerDetalleCarritoDeCompras() =>
            await _context.ListarDetalleCarritoDeCompras();

        [HttpGet]
        [Route("DetalleCarritoDeCompras/{idDetalleCarritoDeCompras}")]
        public async Task<ActionResult<DetalleCarritoDeCompras>> BuscarDetalleCarritoDeComprasPorId(int idDetalleCarritoDeCompras) =>
            await _context.BuscarDetalleCarritoDeComprasPorId(idDetalleCarritoDeCompras);

        [HttpPost]
        [Route("DetalleCarritoDeCompras")]
        public async Task<Object> RegistroDetalleCarritoDeCompras(DetalleCarritoDeCompras DetalleCarritoDeCompras)
        {
            try
            {
                DetalleCarritoDeCompras = await _context.AgregarDetalleCarritoDeCompras(DetalleCarritoDeCompras);
                return Ok(new { mensaje = DetalleCarritoDeCompras });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpPut]
        [Route("DetalleCarritoDeCompras")]
        public async Task<Object> EditarDetalleCarritoDeCompras(DetalleCarritoDeCompras DetalleCarritoDeCompras)
        {
            try
            {
                await _context.EditarDetalleCarritoDeCompras(DetalleCarritoDeCompras);
                return Ok(new { mensaje = "Actializacion exitosa" });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }



        [HttpGet]
        [Route("DetalleEstadosMontajes")]
        public async Task<ActionResult<IEnumerable<DetalleEstadosMontajes>>> ListarDetalleEstadosMontajes() =>
            await _context.ListarDetalleEstadosMontajes();

        [HttpGet]
        [Route("DetalleEstadosMontajes/{idDetalleEstadosMontajes}")]
        public async Task<ActionResult<IEnumerable<DetalleEstadosMontajes>>> ListaDetalleEstadosMontajes(int DetalleEstadosMontajes) =>
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

    }
}
