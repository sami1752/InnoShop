using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Reportes
{
    public class DetalleEstados
    {
        public string IdUsuario { get; set; }

        public int IdEstado { get; set; }
        public int Aosciacion { get; set; }

        public String Estado { get; set; }

        public DateTime FechaInicio { get; set; }

        public DateTime FechaFin { get; set; }



    }
}
