using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Descuentos
{
    public class ValorRuleta
    {
        [Key]
        public int IdValorRuleta { get; set; }
        [Required]
        public string IdUsuario { get; set; }
        [Required]
        public int ValorDeRuleta { get; set; }
        [Required]
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
    }
}
