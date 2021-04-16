using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Solicitudes.CarritoDeCompras
{
    public class DetalleCarritoDeComprasProducto
    {
        public int IdDetalleCarritoDeCompras { get; set; }
        public string IdUsuario { get; set; }
        public int IdProducto { get; set; }
        public int IdCarritoDeCompras { get; set; }
        public string NombreProducto { get; set; }
        public int Cantidad { get; set; }
    }
}
