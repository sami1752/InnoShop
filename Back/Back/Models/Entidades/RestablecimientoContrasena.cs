using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
