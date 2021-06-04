using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Ventas
{
    public class SalidaProductoInfo
    {
        public int IdSalida { get; set; }
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }
        public DateTime Fecha { get; set; }
        public string IdUsuario { get; set; }
        public string NombreUsuario { get; set; }
    }
}
