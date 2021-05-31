using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Solicitudes
{
    [Table("CarritoDeCompras")]
    public class CarritoDeCompras
    {
        [Key]
        public int IdCarritoDeCompras { get; set; }

        [Column(TypeName = "varchar(50)"), Required]
        public string IdUsuario { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        [Required]
        public bool Estado { get; set; }

        [Required]
        public float Valor { get; set; }
    }
}
