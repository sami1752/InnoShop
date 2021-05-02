using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Descuentos
{
    public class DetalleDescuentos
    {
      
        public int IdDescuento { get; set; }
        public string IdUsuario { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public bool Estado { get; set; }
        public int IdPorcentajeRuleta { get; set; }
        public int IdValorRuleta { get; set; }
        public float PorcentajeDescuento { get; set; }
        public int ValorDeRuleta { get; set; }

    }
}
