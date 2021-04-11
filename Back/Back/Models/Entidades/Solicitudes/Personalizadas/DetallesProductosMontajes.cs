using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Solicitudes.Personalizadas
{
    [Table("DetallesProductosMontajes")]
    public class DetallesProductosMontajes
    {
        [Key]
        public int IdDetallesProductosMontajes { get; set; }

        [Required]
        public string IdUsuario { get; set; }

        [Required]
        public int IdMontaje { get; set; }

        [Required]
        public int IdProducto { get; set; }
    }
}
