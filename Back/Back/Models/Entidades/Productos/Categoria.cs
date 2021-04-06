using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Productos
{
    public class Categoria
    {
        [Key]
        public int IdCategoria { get; set; }

        [Column(TypeName ="varchar(20)"), Required]
        public string Nombre { get; set; }
        public DateTime Fecha { get; set; }
        [Column(TypeName = "varchar(50)"), Required]
        public string IdUsuario { get; set; }
    }
}
