using Back.Models.Abstratos;
using Back.Models.Entidades.Reportes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportesController : ControllerBase
    {
        private IServiciosReportes _context;
        public ReportesController(IServiciosReportes context) => _context = context;

        [HttpGet]
        [Route("Solicitudes")]
        public async Task<ActionResult<ReporteSolicitudes>> ObtenerReporteSolicitudes() => await _context.ObtenerReporteSolicitudes();

    }
}
