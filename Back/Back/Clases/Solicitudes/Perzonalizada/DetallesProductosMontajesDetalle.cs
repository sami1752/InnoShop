using Back.Models.Entidades.Productos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Solicitudes.Perzonalizada
{
    public class DetallesProductosMontajesDetalle
    {
        public int IdDetallesProductosMontajes { get; set; }
        public string IdUsuario { get; set; }
        public string Usuario { get; set; }
        public int IdMontaje { get; set; }
        public int IdProducto { get; set; }
        public string Producto { get; set; }
    }
}
