using Back.Models.Abstratos;
using Back.Models.DAL;
using Back.Models.Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
            _context.historialcorreo.Add(historialcorreo);
            await _context.SaveChangesAsync();
        }

    }
}
