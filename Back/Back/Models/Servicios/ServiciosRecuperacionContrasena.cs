using Back.Models.Abstratos;
using Back.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Servicios
{
    public class ServiciosRecuperacionContrasena : IServiciosRecuperacionContrasena
    {
        private readonly DBContext _context;
        public ServiciosRecuperacionContrasena(DBContext context)
        {
            _context = context;
        }


    }
}
