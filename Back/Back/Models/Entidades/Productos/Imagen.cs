﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Productos
{
    public class Imagen
    {
        [Key]
        public int IdImagen { get; set; }

        [Column(TypeName ="varchar(200)"), Required]
        public string RutaImagen { get; set; }


        [Required]
        [ForeignKey("Productos")]
        public int IdProducto { get; set; }
        [ForeignKey("IdProducto")]
        public virtual Producto Productos { get; set; }



        [Column(TypeName = "nvarchar(450)"), Required]
        public string IdUsuario { get; set; }
    }
}
