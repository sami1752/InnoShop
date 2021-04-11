using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Solicitudes.Personalizadas
{
    [Table("DetallesMaterialesSolicitudesPersonalizadas")]
    public class DetallesMaterialesSolicitudesPersonalizadas
    {
        [Key]
        public int IdDetallesMaterialesSolicitudesPersonalizadas { get; set; }

        [Required]
        public string IdUsuario { get; set; }

        [Required]
        public int IdSolicitudPersonalizada { get; set; }

        [Required]
        public int IdMaterial { get; set; }


    }
}
