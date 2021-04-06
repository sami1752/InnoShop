using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Productos
{
    public class PrecioProducto
    {
        [Key]
        public int IdPrecioProducto { get; set; }
        [Required]
        public float Precio { get; set; }
        [Required]
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        [Required]
        public int IdProducto { get; set; }
        [Required]
        public string IdUsuario { get; set; }
    }
}
