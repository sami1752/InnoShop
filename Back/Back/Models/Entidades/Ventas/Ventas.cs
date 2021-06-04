using Back.Models.Entidades.Productos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace Back.Models.Entidades.Ventas
{
    public class Ventas
    {
        [Key]
        public int IdVenta { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        [Column(TypeName = "nvarchar(450)"), Required]
        public string IdUsuario { get; set; }

        [Required]
        [ForeignKey("Descuentos")]
        public int IdDescuento { get; set; }
        [ForeignKey("IdDescuento")]
        public virtual Back.Models.Entidades.Descuentos.Descuentos Descuentos { get; set; }


        [Required]
        public float Total { get; set; }


        [Required]
        [ForeignKey("Iva")]
        public int IdIva { get; set; }
        [ForeignKey("IdIva")]
        public virtual Iva Iva { get; set; }


        [Required]
        public float TotalIva { get; set; }
    }
}
