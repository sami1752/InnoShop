using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Solicitudes.Personalizadas
{
    [Table("PrecioMontajes")]
    public class PrecioMontajes
    {
        [Key]
        public int IdPrecioMontajes { get; set; }

        [Required]
        public string IdUsuario { get; set; }

        [Required]
        public float Precio { get; set; }

        [Required]
        public DateTime FechaInicio { get; set; }
        [Required]
        public DateTime FechaFin { get; set; }

        [Required]
        public int IdMontaje { get; set; }
    }
}
