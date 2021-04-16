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

        [Required]
        public string IdUsuario { get; set; }

        [Required]
        public int IdProducto { get; set; }
        [Required]
        public int IdCarritoDeCompras { get; set; }
        [Required]
        public int Cantidad { get; set; }

    }
}
