using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Back.Models.DAL;
using Back.Models.Entidades;
using System.Net.Mail;
using System.Net;
using Back.Models.Abstratos;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class historialcorreosController : ControllerBase
    {
        private readonly IServiciosHistorialCorreo _context;

        public historialcorreosController(IServiciosHistorialCorreo context)
        {
            _context = context;
        }

        // GET: api/historialcorreos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<historialcorreo>>> Gethistorialcorreo()
        {
            return new ObjectResult(await _context.ObtenerHistorial());
        }


        // POST: api/historialcorreos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<historialcorreo>> Posthistorialcorreo(historialcorreo historialcorreo)
        {
            await _context.AgregarHistoria(historialcorreo);
            return CreatedAtAction("Gethistorialcorreo", new { id = historialcorreo.IdHistorial }, historialcorreo);
        }
    }
}
