using Back.Models.Entidades.Productos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Ventas
{
    public class DetalleVentaProductos
    {
        [Key]
        public int IdDetalleVentaProducto { get; set; }

        [Required]
        public int Cantidad { get; set; }

        [Required]
        public float SubTotal { get; set; }

        [Required]
        [ForeignKey("Ventas")]
        public int IdVenta { get; set; }
        [ForeignKey("IdVenta")]
        public virtual Ventas Ventas { get; set; }


        [Required]
        [ForeignKey("Productos")]
        public int IdProducto { get; set; }
        [ForeignKey("IdProducto")]
        public virtual Producto Productos { get; set; }
    }
}
