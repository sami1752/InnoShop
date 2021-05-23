using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Ventas
{
    public class DetalleVenta
    {
        public int IdVenta { get; set; }
        public DateTime Fecha { get; set; }
        public string IdUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public int IdDescuento { get; set; }
        public float ValorDescuento { get; set; }
        public float PorcentajeDescuento { get; set; }
        public float Total { get; set; }
        public int IdIva { get; set; }
        public float ValorIva { get; set; }
        public float TotalIva { get; set; }
        public float SubTotal { get; set; }

    }
}
