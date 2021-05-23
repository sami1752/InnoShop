using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Ventas
{
    public class DetalleVentaProductoInfo
    {
        public int IdDetalleVentaProducto { get; set; }
        public int Cantidad { get; set; }
        public float SubTotal { get; set; }
        public int IdVenta { get; set; }
        public int IdProducto { get; set; }
        public string NombreProducto { get; set; }
    }
}
