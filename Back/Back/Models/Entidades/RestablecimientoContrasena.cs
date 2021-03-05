using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades
{
    [Table("RestablecimientoContrasena")]
    public class RestablecimientoContrasena
    {
        [Key]
        public int IdRestablecimiento { get; set; }
        [Required]
        public string Correo { get; set; }
        [Required]
        public string Fecha { get; set; }
        [Required]
        public string Codigo { get; set; }

    }
}
