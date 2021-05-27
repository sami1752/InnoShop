using Back.Models.Entidades.Reportes;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Abstratos
{
    public interface IServiciosReportes
    {
        Task<ActionResult<ReporteSolicitudes>> ObtenerReporteSolicitudes(DateTime desde, DateTime hasta);
        Task<ActionResult<ReporteMontaje>> ObtenerReporteMontajes(DateTime desde, DateTime hasta);
    }
}
