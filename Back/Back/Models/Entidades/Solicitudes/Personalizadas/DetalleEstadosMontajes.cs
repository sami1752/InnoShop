using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Solicitudes.Personalizadas
{
    [Table("DetalleEstadosMontajes")]
    public class DetalleEstadosMontajes
    {
        [Key]
        public int IdDetalleEstadosMontajes { get; set; }

        [Column(TypeName = "nvarchar(450)"), Required]
        public string IdUsuario { get; set; }

        [Required]
        [ForeignKey("Estados")]
        public int IdEstado { get; set; }
        [ForeignKey("IdEstado")]
        public virtual Estados Estados { get; set; }

        [Required]
        public DateTime FechaInicio { get; set; }

        [Required]
        public DateTime FechaFin { get; set; }

        [Required]
        [ForeignKey("Montajes")]
        public int IdMontaje { get; set; }
        [ForeignKey("IdMontaje")]
        public virtual Montajes Montajes { get; set; }


    }
}
