using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Solicitudes.Perzonalizada
{
    public class DetalleRespuestasSolicitudP
    {
        public int IdRespuestaSolicitudesPersonalizadas { get; set; }
        public string IdUsuario { get; set; }
        public string Usuario { get; set; }
        public int IdSolicitudPersonalizada { get; set; }
        public string Respuesta { get; set; }
        public DateTime Fecha { get; set; }
    }
}
