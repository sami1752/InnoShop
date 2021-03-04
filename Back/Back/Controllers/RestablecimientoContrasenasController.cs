using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Back.Models.DAL;
using Back.Models.Entidades;
using Back.Models.Servicios;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestablecimientoContrasenasController : ControllerBase
    {
        private readonly DBContext _context;

        public RestablecimientoContrasenasController(DBContext context)
        {
            _context = context;
        }

        // GET: api/RestablecimientoContrasenas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RestablecimientoContrasena>>> GetrestablecimientoContrasenas()
        {
            return await _context.restablecimientoContrasenas.ToListAsync();
        }

        // GET: api/RestablecimientoContrasenas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RestablecimientoContrasena>> GetRestablecimientoContrasena(int id)
        {
            var restablecimientoContrasena = await _context.restablecimientoContrasenas.FindAsync(id);

            if (restablecimientoContrasena == null)
            {
                return NotFound();
            }

            return restablecimientoContrasena;
        }

        // PUT: api/RestablecimientoContrasenas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRestablecimientoContrasena(int id, RestablecimientoContrasena restablecimientoContrasena)
        {
            if (id != restablecimientoContrasena.IdRestablecimiento)
            {
                return BadRequest();
            }

            _context.Entry(restablecimientoContrasena).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RestablecimientoContrasenaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RestablecimientoContrasenas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RestablecimientoContrasena>> PostRestablecimientoContrasena(RestablecimientoContrasena restablecimientoContrasena)
        {
            Guid miGuid = Guid.NewGuid();
            string token = Convert.ToBase64String(miGuid.ToByteArray());
            token = token.Replace("=", "").Replace("+", "");
            ServiciosHistorialCorreo serviciosHistorialCorreo = new ServiciosHistorialCorreo(_context);
            historialcorreo historialcorreo = new historialcorreo
            {
                Asunto = "Codigo de recuperacion de Cuenta InnoShop",
                Correo = restablecimientoContrasena.Correo,
                Mensaje = token,
                NombreEvi = "Innova"
            };

            restablecimientoContrasena.Codigo = token;
            restablecimientoContrasena.Fecha =  DateTime.Now.ToString();

            await serviciosHistorialCorreo.AgregarHistoria(historialcorreo);
            _context.restablecimientoContrasenas.Add(restablecimientoContrasena);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRestablecimientoContrasena", new { id = restablecimientoContrasena.IdRestablecimiento }, restablecimientoContrasena);
        }

        // DELETE: api/RestablecimientoContrasenas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestablecimientoContrasena(int id)
        {
            var restablecimientoContrasena = await _context.restablecimientoContrasenas.FindAsync(id);
            if (restablecimientoContrasena == null)
            {
                return NotFound();
            }

            _context.restablecimientoContrasenas.Remove(restablecimientoContrasena);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RestablecimientoContrasenaExists(int id)
        {
            return _context.restablecimientoContrasenas.Any(e => e.IdRestablecimiento == id);
        }

    }
}
