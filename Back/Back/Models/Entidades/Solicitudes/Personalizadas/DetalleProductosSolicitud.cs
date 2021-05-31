using Back.Models.Entidades.Productos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Solicitudes.Personalizadas
{
    [Table("DetalleProductosSolicitud")]
    public class DetalleProductosSolicitud
    {
        [Key]
        public int IdDetalleProductosSolicitud { get; set; }

        [Column(TypeName = "varchar(50)"), Required]
        public string IdUsuario { get; set; }

        [Required]
        [ForeignKey("SolicitudPersonalizada")]
        public int IdSolicitudPersonalizada { get; set; }
        [ForeignKey("IdSolicitudPersonalizada")]
        public virtual SolicitudPersonalizada SolicitudPersonalizada { get; set; }

        [Required]
        [ForeignKey("Productos")]
        public int IdProducto { get; set; }
        [ForeignKey("IdProducto")]
        public virtual Producto Productos { get; set; }
    }
}
