using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Descuentos
{
    public class Descuentos
    {
        [Key]
        public int IdDescuento { get; set; }

        [Column(TypeName = "varchar(50)"), Required]
        public string IdUsuario { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        [Required]
        public DateTime FechaVencimiento { get; set; }

        [Required]
        public bool Estado { get; set; }

        [Required]
        [ForeignKey("PorcentajesRuleta")]
        public int IdPorcentajeRuleta { get; set; }
        [ForeignKey("IdPorcentajeRuleta")]
        public virtual PorcentajesRuleta PorcentajesRuleta { get; set; }



        [Required]
        [ForeignKey("ValorRuleta")]
        public int IdValorRuleta { get; set; }
        [ForeignKey("IdValorRuleta")]
        public virtual ValorRuleta ValorRuleta { get; set; }



    }
}
