using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Productos
{
    public class DetalleMaterial
    {
        [Key]
        public int IdDetalleMaterial { get; set; }

        [Required]
        [ForeignKey("Productos")]
        public int IdProducto { get; set; }
        [ForeignKey("IdProducto")]
        public virtual Producto Productos { get; set; }

        [Required]
        [ForeignKey("Material")]
        public int IdMaterial { get; set; }
        [ForeignKey("IdMaterial")]
        public virtual Material Material { get; set; }


        [Column(TypeName = "varchar(50)"), Required]
        public string IdUsuario { get; set; }
    }
}
