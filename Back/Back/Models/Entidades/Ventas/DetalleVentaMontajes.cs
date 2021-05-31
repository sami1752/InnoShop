using Back.Models.Entidades.Solicitudes.Personalizadas;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Ventas
{
    public class DetalleVentaMontajes
    {
        [Key]
        public int IdDetalleVentaMontaje { get; set; }

        [Required]
        public int Cantidad { get; set; }

        [Required]
        public float SubTotal { get; set; }

        [Required]
        [ForeignKey("Ventas")]
        public int IdVenta { get; set; }
        [ForeignKey("IdVenta")]
        public virtual Ventas Ventas { get; set; }


        [Required]
        [ForeignKey("Montajes")]
        public int IdMontaje { get; set; }
        [ForeignKey("IdMontaje")]
        public virtual Montajes Montajes { get; set; }
    }
}
