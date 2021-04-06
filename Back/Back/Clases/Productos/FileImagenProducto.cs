using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Productos
{
    public class FileImagenProducto
    {
        public IFormFile Imagen { get; set; }
        public string RutaImagen { get; set; }

        public int IdProducto { get; set; }
        public string IdUsuario { get; set; }
    }
}
