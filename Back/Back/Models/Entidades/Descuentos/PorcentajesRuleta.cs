using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Descuentos
{
    public class PorcentajesRuleta
    {
        [Key]
        public int IdPorcentajeRuleta  { get; set; }
        [Required]
        public float Porcentaje { get; set; }
        [Required]
        public bool Estado { get; set; }
        [Required]
        public string IdUsuario { get; set; }
        [Required]
        public DateTime Fecha { get; set; }
    }
}
