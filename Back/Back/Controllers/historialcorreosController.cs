using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Back.Models.Entidades;
using Back.Models.Abstratos;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistorialcorreosController : ControllerBase
    {
        private readonly IServiciosHistorialCorreo _context;

        public HistorialcorreosController(IServiciosHistorialCorreo context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<historialcorreo>>> Gethistorialcorreo() => new ObjectResult(await _context.ObtenerHistorial());

        [HttpPost]
        public async Task<Object> Posthistorialcorreo(historialcorreo historialcorreo)
        {
            try
            {
                await _context.AgregarHistoria(historialcorreo);
                return CreatedAtAction("Gethistorialcorreo", new { id = historialcorreo.IdHistorial }, historialcorreo);
            }
            catch (Exception e)
            {
                return e;
            }
        }
    }
}
