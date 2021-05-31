using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Productos
{
    public class Material
    {
        [Key]
        public int IdMaterial   { get; set; }

        [Column(TypeName ="varchar(150)"), Required]
        public string Nombre{ get; set; }

        [Column(TypeName = "varchar(500)"), Required]
        public string Descripcion { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        [Column(TypeName = "nvarchar(450)"), Required]
        public string IdUsuario  { get; set; }
    }
}
