using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Productos
{
    public class DetalleIva
    {
        public int IdIva { get; set; }
        public float Porcentaje { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string IdUsuario { get; set; }
        public string NombreUsuario { get; set; }
    }
}
