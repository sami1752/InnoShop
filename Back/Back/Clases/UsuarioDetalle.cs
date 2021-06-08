using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases
{
    public class UsuarioDetalle
    {
        public string Nombres { get; set; }

        public string Apellidos { get; set; }

        public string Sexo { get; set; }

        public int IdRol { get; set; }

        public string TipoDocumento { get; set; }

        public string NumDocumento { get; set; }

        public string Telefono { get; set; }
        public string Direccion { get; set; }
        public int Puntos { get; set; }

        public bool Estado { get; set; }
        public string NombreRol { get; set; }
    }
}
