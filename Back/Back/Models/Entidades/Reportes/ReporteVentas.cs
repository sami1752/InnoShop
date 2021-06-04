using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Reportes
{
    public class ReporteVentas
    {
        public int CantProdPerso { get; set; }
        public float MontoPerso { get; set; }
        public int NumDescuentosPerson { get; set; }
        public int MontoDescuentosPerson { get; set; }


        public int CantProducto { get; set; }
        public float MontoProd { get; set; }
        public int NumDescuentosProd { get; set; }
        public float MontoDescuentosProdu { get; set; }


        public float TotalGlobal { get; set; }
        public float TotalDescuentos { get; set; }
        public float TotalIngresos { get; set; }
    }
}
