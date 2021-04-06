using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Productos
{
    public class DetalleMaterial
    {
        [Key]
        public int IdDetalleMaterial { get; set; }
        public int IdProducto { get; set; }
        public int IdMaterial { get; set; }
        public string IdUsuario { get; set; }
    }
}
