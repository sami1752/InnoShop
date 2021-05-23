using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Solicitudes.Perzonalizada
{
    public class DeTalleProductoSolicitudVT
    {
        public float Vt { get; set; }
        public int IdSolicitud { get; set; }
        public float Precio { get; set; }
        public int CantidadStock { get; set; }
        public int IdProducto { get; set; }


    }
}
