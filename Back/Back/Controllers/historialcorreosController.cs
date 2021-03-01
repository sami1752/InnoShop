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

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class historialcorreosController : ControllerBase
    {
        private readonly DBContext _context;

        public historialcorreosController(DBContext context)
        {
            _context = context;
        }

        // GET: api/historialcorreos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<historialcorreo>>> Gethistorialcorreo()
        {
            return await _context.historialcorreo.ToListAsync();
        }

        // GET: api/historialcorreos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<historialcorreo>> Gethistorialcorreo(int id)
        {
            var historialcorreo = await _context.historialcorreo.FindAsync(id);

            if (historialcorreo == null)
            {
                return NotFound();
            }

            return historialcorreo;
        }

        // PUT: api/historialcorreos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Puthistorialcorreo(int id, historialcorreo historialcorreo)
        {
            if (id != historialcorreo.IdHistorial)
            {
                return BadRequest();
            }

            _context.Entry(historialcorreo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!historialcorreoExists(id))
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

        // POST: api/historialcorreos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<historialcorreo>> Posthistorialcorreo(historialcorreo historialcorreo)
        {
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress("sami1752sami@gmail.com", historialcorreo.NombreEvi);
                mail.To.Add(historialcorreo.Correo);
                mail.Subject = historialcorreo.Asunto;
                mail.Body = $"<p>{historialcorreo.Mensaje}</p>";
                mail.IsBodyHtml = true;
                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.Credentials = new NetworkCredential("sami1752sami@gmail.com", "30088713311752");
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                }
            }

            

            _context.historialcorreo.Add(historialcorreo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Gethistorialcorreo", new { id = historialcorreo.IdHistorial }, historialcorreo);
        }

        // DELETE: api/historialcorreos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletehistorialcorreo(int id)
        {
            var historialcorreo = await _context.historialcorreo.FindAsync(id);
            if (historialcorreo == null)
            {
                return NotFound();
            }

            _context.historialcorreo.Remove(historialcorreo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool historialcorreoExists(int id)
        {
            return _context.historialcorreo.Any(e => e.IdHistorial == id);
        }
    }
}
