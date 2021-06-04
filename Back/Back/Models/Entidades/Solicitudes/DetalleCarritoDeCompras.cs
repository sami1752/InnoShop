using Back.Models.Entidades.Productos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Solicitudes
{
    [Table("DetalleCarritoDeCompras")]
    public class DetalleCarritoDeCompras
    {
        [Key]
        public int IdDetalleCarritoDeCompras { get; set; }

        [Column(TypeName = "nvarchar(450)"), Required]
        public string IdUsuario { get; set; }

        [Required]
        [ForeignKey("Productos")]
        public int IdProducto { get; set; }
        [ForeignKey("IdProducto")]
        public virtual Producto Productos { get; set; }


        [Required]
        [ForeignKey("CarritoDeCompras")]
        public int IdCarritoDeCompras { get; set; }
        [ForeignKey("IdCarritoDeCompras")]
        public virtual CarritoDeCompras CarritoDeCompras { get; set; }


        [Required]
        public int Cantidad { get; set; }

    }
}
