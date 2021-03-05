using Back.Models.Abstratos;
using Back.Models.DAL;
using Back.Models.Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Back.Models.Servicios
{
    public class ServiciosHistorialCorreo : IServiciosHistorialCorreo
    {
        private readonly DBContext _context;
        public ServiciosHistorialCorreo(DBContext context)
        {
            _context = context;

        }

        public async Task<IEnumerable<historialcorreo>> ObtenerHistorial()
        {
            return await _context.historialcorreo.ToListAsync();
        }

        public async Task AgregarHistoria(historialcorreo historialcorreo)
        {
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress("juanjeffer1@gmail.com", historialcorreo.NombreEvi);
                mail.To.Add(historialcorreo.Correo);
                mail.Subject = historialcorreo.Asunto;
                mail.Body = $"<p>{historialcorreo.Mensaje}</p>";
                mail.IsBodyHtml = true;
                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.Credentials = new NetworkCredential("juanjeffer1@gmail.com", "zurpancarda");
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                }
            }
            _context.historialcorreo.Add(historialcorreo);
            await _context.SaveChangesAsync();
        }

    }
}