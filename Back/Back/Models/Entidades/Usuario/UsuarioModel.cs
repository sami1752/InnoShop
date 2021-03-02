using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Usuario
{
    public class UsuarioModel
    {
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Correo { get; set; }
        public string Contrasena { get; set; }
        public int IdRol { get; set; }
        public string TipoDocumento { get; set; }
        public string Sexo { get; set; }
        public string NumDocumento { get; set; }
        public string Telefono { get; set; }
        public int Puntos { get; set; }
    }
}
