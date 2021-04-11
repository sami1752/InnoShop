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

        [Required]
        public string IdUsuario { get; set; }

        [Required]
        public int IdEstado { get; set; }

        [Required]
        public DateTime FechaInicio { get; set; }
        [Required]
        public DateTime FechaFin { get; set; }

        [Required]
        public int IdSolicitudPersonalizada { get; set; }
    }
}
