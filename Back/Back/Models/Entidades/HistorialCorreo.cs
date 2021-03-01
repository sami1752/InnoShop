using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades
{
    [Table("HistorialCorreo")]
    public class historialcorreo
    {
        [Key]
        public int IdHistorial { get; set; }
        [Required]
        public string Correo { get; set; }
        [Required]
        public string Asunto { get; set; }
        [Required]
        public string NombreEvi { get; set; }
        [Required]
        public string Mensaje { get; set; }

    }
}
