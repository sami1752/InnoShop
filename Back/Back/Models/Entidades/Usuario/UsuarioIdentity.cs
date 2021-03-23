using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back.Models.Usuario
{
    public class UsuarioIdentity : IdentityUser
    {
        [Column(TypeName = "varchar(40)"), Required]
        public string Nombres { get; set; }
        [Column(TypeName = "varchar(40)"), Required]
        public string Apellidos { get; set; }
        [Column(TypeName = "varchar(20)"), Required]
        public string Sexo { get; set; }
        [Required]
        public int IdRol { get; set; }
        [Column(TypeName = "varchar(25)"), Required]
        public string TipoDocumento { get; set; }
        [Column(TypeName = "varchar(10)"), Required]
        public string NumDocumento { get; set; }
        [Column(TypeName = "varchar(10)"), Required]
        public string Telefono { get; set; }
        [Column(TypeName = "varchar(50)"), Required]
        public string Direccion { get; set; }
        public int Puntos { get; set; }
        [Required]
        public bool Estado { get; set; }
    }
}
