using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades
{
    public class ActualizacionContrasena
    {
        public string Correo { get; set; }
        public string Contrasena { get; set; }
        public string ContrasenaAntigua { get; set; }
    }
}
