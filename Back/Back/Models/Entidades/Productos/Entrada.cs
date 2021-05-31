using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Productos
{
    public class Entrada
    {
        [Key]
        public int IdEntrada { get; set; }



        [Required]
        [ForeignKey("Productos")]
        public int IdProducto { get; set; }
        [ForeignKey("IdProducto")]
        public virtual Producto Productos { get; set; }



        [Required]
        public int Cantidad { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        [Column(TypeName = "varchar(50)"), Required]
        public string IdUsuario { get; set; }
    }
}
