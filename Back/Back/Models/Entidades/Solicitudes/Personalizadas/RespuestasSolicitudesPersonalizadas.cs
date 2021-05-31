using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Solicitudes.Personalizadas
{
    [Table("RespuestasSolicitudesPersonalizadas")]
    public class RespuestasSolicitudesPersonalizadas
    {
        [Key]
        public int IdRespuestaSolicitudesPersonalizadas { get; set; }

        [Column(TypeName = "varchar(50)"), Required]
        public string IdUsuario { get; set; }

        [Required]
        [ForeignKey("SolicitudPersonalizada")]
        public int IdSolicitudPersonalizada { get; set; }
        [ForeignKey("IdSolicitudPersonalizada")]
        public virtual SolicitudPersonalizada SolicitudPersonalizada { get; set; }

        [Column(TypeName = "varchar(500)"), Required]
        public string Respuesta { get; set; }

        [Required]
        public DateTime Fecha { get; set; }
    }
}
