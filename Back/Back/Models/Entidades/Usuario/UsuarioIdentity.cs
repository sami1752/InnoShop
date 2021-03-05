using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Usuario
{
    public class UsuarioIdentity : IdentityUser
    {
        [Column(TypeName = "varchar(40)"), Required]
        public string Nombres { get; set; }

        [Column(TypeName = "varchar(40)"), Required]
        public string Apellidos { get; set; }

        [Column(TypeName = "varchar(10)"), Required]
        public string Sexo { get; set; }
        
        [Required]
        public int IdRol { get; set; }

        [Column(TypeName = "varchar(25)"), Required]
        public string TipoDocumento { get; set; }
        public string C { get; set; }
        [Column(TypeName = "varchar(10)"), Required]
        public string NumDocumento { get; set; }

        [Column(TypeName = "varchar(10)"), Required]
        public string Telefono { get; set; }

        [Column(TypeName = "varchar(10)"), Required]
        public string Direccion { get; set; }

        public int Puntos { get; set; }
    }
}
