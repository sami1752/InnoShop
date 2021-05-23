using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Solicitudes.Perzonalizada
{
    public class DetalleRespuestasM
    {
        public int IdRespuestaMontajes { get; set; }
        public string IdUsuario { get; set; }
        public string Usuario { get; set; }
        public int IdMontaje { get; set; }
        public string Respuesta { get; set; }
        public DateTime Fecha { get; set; }
    }
}
