using Back.Models.Entidades.Solicitudes.Personalizadas;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        [ForeignKey("Ventas")]
        public int IdVenta { get; set; }
        [ForeignKey("IdVenta")]
        public virtual Ventas Ventas { get; set; }

        [Required]
        [ForeignKey("SolicitudPersonalizada")]
        public int IdSolicitudPersonalizada { get; set; }
        [ForeignKey("IdSolicitudPersonalizada")]
        public virtual SolicitudPersonalizada SolicitudPersonalizada { get; set; }
    }
}
