using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Solicitudes.Personalizadas
{
    [Table("DetalleEstadosSolicitudPersonalizada")]
    public class DetalleEstadosSolicitudPersonalizada
    {
        [Key]
        public int IdDetalleEstadoSolicitudPersonalizada { get; set; }

        [Column(TypeName = "varchar(50)"), Required]
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
        [ForeignKey("SolicitudPersonalizada")]
        public int IdSolicitudPersonalizada { get; set; }
        [ForeignKey("IdSolicitudPersonalizada")]
        public virtual SolicitudPersonalizada SolicitudPersonalizada { get; set; }


    }
}
