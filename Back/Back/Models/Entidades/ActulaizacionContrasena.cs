using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades
{
    public class ActulaizacionContrasena
    {
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}
