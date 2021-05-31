using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Solicitudes.Personalizadas
{
    [Table("SolicitudPersonalizada")]
    public class SolicitudPersonalizada
    {
        [Key]
        public int IdSolicitudPersonalizada { get; set; }

        [Column(TypeName = "varchar(50)"), Required]
        public string IdUsuario { get; set; }

        [Required]
        public float Ancho { get; set; }

        [Required]
        public float Fondo { get; set; }

        [Required]
        public float Alto { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        [Column(TypeName = "varchar(500)"), Required]
        public string Descripcion { get; set; }

    }
}
