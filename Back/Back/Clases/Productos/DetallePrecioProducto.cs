using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Productos
{
    public class DetallePrecioProducto
    {
        public int IdPrecioProducto { get; set; }
        public float Precio { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public int IdProducto { get; set; }
        public string IdUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public string NombreProducto { get; set; }
    }
}
