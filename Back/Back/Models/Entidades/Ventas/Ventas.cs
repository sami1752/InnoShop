using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [Required]
        public string IdUsuario { get; set; }
        [Required]
        public int IdDescuento { get; set; }
        [Required]
        public float SubTotal { get; set; }
        [Required]
        public float Total { get; set; }
        [Required]
        public int IdIva { get; set; }
        [Required]
        public float TotalIva { get; set; }
    }
}
