using Back.Models.Entidades.Productos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Solicitudes.Personalizadas
{
    public class DetalleProductosSolicitudDetalle
    {
        public int IdDetalleProductosSolicitud { get; set; }
        public string IdUsuario { get; set; }
        public string Usuario { get; set; }
        public int IdSolicitudPersonalizada { get; set; }
        public int IdProducto { get; set; }
        public String Producto { get; set; }
    }
}
