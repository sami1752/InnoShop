using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Productos
{
    public class Iva
    {
        [Key]
        public int IdIva { get; set; }
        [Required]
        public float Porcentaje { get; set; }
        [Required]
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        [Column(TypeName = "varchar(50)"), Required]
        public string IdUsuario { get; set; }
    }
}
