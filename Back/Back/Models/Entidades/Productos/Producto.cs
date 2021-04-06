using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Productos
{
    public class Producto
    {
        [Key]
        public int IdProducto { get; set; }

        [Column(TypeName = "varchar(60)"), Required]
        public string Nombre { get; set; }
        
        public bool Estado { get; set; }
        
        
        public float Ancho { get; set; }

        public float Largo { get; set; }
        public float Fondo { get; set; }

        [Column(TypeName ="varchar(20)")]
        public string TipoPuerta { get; set; }

        [Column(TypeName ="varchar(250)")]
        public string Descripcion { get; set; }

        public bool Ruedas { get; set; }
        [Column(TypeName = "varchar(50)"), Required]
        public string IdUsuario { get; set; }

        public int Puntos { get; set; }
        public int IdCategoria { get; set; }
        public int GarantiaMeses { get; set; }

    }
}
