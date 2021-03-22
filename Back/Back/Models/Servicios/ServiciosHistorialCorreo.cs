﻿using Back.Models.Abstratos;
using Back.Models.DAL;
using Back.Models.Entidades;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Back.Models.Servicios
{
    public class ServiciosHistorialCorreo : IServiciosHistorialCorreo
    {
        private readonly DBContext _context;
        public ServiciosHistorialCorreo(DBContext context) => _context = context;

        public async Task<IEnumerable<historialcorreo>> ObtenerHistorial() => await _context.Historialcorreo.ToListAsync();

        public async Task AgregarHistoria(historialcorreo historialcorreo)
        {
            using (MailMessage mail = new())
            {
                mail.From = new MailAddress("innoshopcali@gmail.com", historialcorreo.NombreEvi);
                mail.To.Add(historialcorreo.Email);
                mail.Subject = historialcorreo.Asunto;
                mail.Body = $"<p>{historialcorreo.Mensaje}</p>";
                mail.IsBodyHtml = true;
                using SmtpClient smtp = new("smtp.gmail.com", 587);
                smtp.Credentials = new NetworkCredential("innoshopcali@gmail.com", "Innova1234");
                smtp.EnableSsl = true;
                smtp.Send(mail);
            }
            _context.Historialcorreo.Add(historialcorreo);
            await _context.SaveChangesAsync();
        }
    }
}