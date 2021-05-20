using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Clases.Solicitudes.Perzonalizada
{
    public class MontajeDetalle
    {
        public int IdMontaje { get; set; }
        public string IdUsuario { get; set; }
        public string Direccion { get; set; }
        public float Ancho { get; set; }
        public float Fondo { get; set; }
        public float Alto { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        public float ValorTotal { get; set; }
        public string Estado { get; set; }
        public string Usuario { get; set; }
    }
}
