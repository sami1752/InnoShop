using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Entidades.Reportes
{
    public class ReporteSolicitudes
    {

        [Key]
        public int Enviada { get; set; }

        [Required]
        public int Cotizada { get; set; }

        [Required]
        public int Devuelta { get; set; }

        [Required]
        public int Aceptada { get; set; }

        [Required]
        public int Rechazada { get; set; }

        [Required]
        public int Cancelada { get; set; }

        [Required]
        public int Pagada { get; set; }

        [Required]
        public int EnProcesoDeFabricacion { get; set; }

        [Required]
        public int Terminada { get; set; }

        [Required]
        public int Modificada { get; set; }

        [Required]
        public int EnProcesoDeCotizacion { get; set; }

        [Required]
        public int TotalSolicitudes { get; set; }

        [Required]
        public float TotalVendido { get; set; }

        [Required]
        public float TotalCotizado { get; set; }
    }
}
