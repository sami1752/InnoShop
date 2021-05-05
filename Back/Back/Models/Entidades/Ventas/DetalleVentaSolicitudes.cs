using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Ventas
{
    public class DetalleVentaSolicitudes
    {
        [Key]
        public int IdDetalleVentaSolicitud { get; set; }
        [Required]
        public int Cantidad { get; set; }
        [Required]
        public float SubTotal { get; set; }
        [Required]
        public int IdVenta { get; set; }
        [Required]
        public int IdSolicitudPersonalizada { get; set; }
    }
}
