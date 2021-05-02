using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Descuentos
{
    public class Descuentos
    {
        [Key]
        public int IdDescuento { get; set; }
        [Required]
        public string IdUsuario { get; set; }
        [Required]
        public DateTime Fecha { get; set; }
        [Required]
        public DateTime FechaVencimiento { get; set; }
        [Required]
        public bool Estado { get; set; }
        [Required]
        public int IdPorcentajeRuleta { get; set; }
        [Required]
        public int IdValorRuleta { get; set; }
    }
}
