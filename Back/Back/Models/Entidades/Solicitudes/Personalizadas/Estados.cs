using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Solicitudes.Personalizadas
{
    [Table("Estados")]
    public class Estados
    {
        [Key]
        public int IdEstado { get; set; }

        [Required]
        public string IdUsuario { get; set; }

        [Required]
        public string Estado { get; set; }
    }
}
