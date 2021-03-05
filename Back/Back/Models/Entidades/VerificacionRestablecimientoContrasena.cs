using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades
{
    public class VerificacionRestablecimientoContrasena
    {
        public string Correo { get; set; }
        public string Codigo { get; set; }
    }
}
