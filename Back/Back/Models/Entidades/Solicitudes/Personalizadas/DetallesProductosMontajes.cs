using Back.Models.Entidades.Productos;
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

        [Column(TypeName = "nvarchar(450)"), Required]
        public string IdUsuario { get; set; }

        [Required]
        [ForeignKey("Montajes")]
        public int IdMontaje { get; set; }
        [ForeignKey("IdMontaje")]
        public virtual Montajes Montajes { get; set; }

        [Required]
        [ForeignKey("Productos")]
        public int IdProducto { get; set; }
        [ForeignKey("IdProducto")]
        public virtual Producto Productos { get; set; }
    }
}
