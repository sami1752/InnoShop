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
        public int Enviada { get; set; }
        public int Cotizada { get; set; }
        public int Devuelta { get; set; }
        public int Aceptada { get; set; }
        public int Rechazada { get; set; }
        public int Cancelada { get; set; }
        public int Pagada { get; set; }
        public int EnProcesoDeFabricacion { get; set; }
        public int Terminada { get; set; }
        public int Modificada { get; set; }
        public int EnProcesoDeCotizacion { get; set; }

        public int TotalSolicitudes { get; set; }
        public float TotalVendido { get; set; }
        public int Entregada { get; set; }

    }
}
