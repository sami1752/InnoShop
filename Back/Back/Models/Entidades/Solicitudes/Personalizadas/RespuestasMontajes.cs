using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Solicitudes.Personalizadas
{
    [Table("RespuestasMontajes")]
    public class RespuestasMontajes
    {
        [Key]
        public int IdRespuestaMontajes { get; set; }

        [Column(TypeName = "nvarchar(450)"), Required]
        public string IdUsuario { get; set; }

        [Required]
        [ForeignKey("Montajes")]
        public int IdMontaje { get; set; }
        [ForeignKey("IdMontaje")]
        public virtual Montajes Montajes { get; set; }

        [Column(TypeName = "varchar(500)"), Required]
        public string Respuesta { get; set; }

        [Required]
        public DateTime Fecha { get; set; }
    }
}
