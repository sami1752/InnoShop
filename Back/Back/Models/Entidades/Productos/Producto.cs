using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Productos
{
    public class Producto
    {
        [Key]
        public int IdProducto { get; set; }

        [Column(TypeName = "varchar(60)"), Required]
        public string Nombre { get; set; }

        [Required]
        public bool Estado { get; set; }

        [Required]
        public float Ancho { get; set; }

        [Required]
        public float Largo { get; set; }

        [Required]
        public float Fondo { get; set; }

        [Required]
        [Column(TypeName ="varchar(30)")]
        public string TipoPuerta { get; set; }

        [Required]
        [Column(TypeName ="varchar(500)")]
        public string Descripcion { get; set; }

        [Required]
        public bool Ruedas { get; set; }

        [Column(TypeName = "varchar(50)"), Required]
        public string IdUsuario { get; set; }

        [Required]
        public int Puntos { get; set; }

        [Required]
        [ForeignKey("Categorias")]
        public int IdCategoria { get; set; }
        [Required]
        [ForeignKey("IdCategoria")]
        public virtual Categoria Categorias { get; set; }

        [Required]
        public int GarantiaMeses { get; set; }

    }
}
