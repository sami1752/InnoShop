using Back.Models.Abstratos;
using Back.Models.Entidades.Solicitudes;
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
    }
}
