using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Productos
{
    public class DetalleProducto
    {
        public string NombreCategoria { get; set; }
        public int IdProducto { get; set; }
        public string Nombre { get; set; }
        public bool Estado { get; set; }
        public float Ancho { get; set; }
        public float Largo { get; set; }
        public float Fondo { get; set; }
        public string TipoPuerta { get; set; }
        public string Descripcion { get; set; }
        public bool Ruedas { get; set; }
        public int IdUsuario { get; set; }
        public int Puntos { get; set; }
        public int IdCategoria { get; set; }
        public int GarantiaMeses { get; set; }

        public float Precio { get; set; }

    }
}
