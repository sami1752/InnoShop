using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Productos
{
    public class DetalleMaterialNombres
    {
        public int IdDetalleMaterial { get; set; }
        public int IdProducto { get; set; }
        public int IdMaterial { get; set; }
        public string IdUsuario { get; set; }
        public string NombreMaterial { get; set; }

        public string Descripcion { get; set; }

    }
}
