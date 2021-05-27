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
        [Route("Solicitudes/{desde}/{hasta}")]
        public async Task<ActionResult<ReporteSolicitudes>> ObtenerReporteSolicitudes(DateTime desde, DateTime hasta) =>
            await _context.ObtenerReporteSolicitudes(desde, hasta);

        [HttpGet]
        [Route("Montajes/{desde}/{hasta}")]
        public async Task<ActionResult<ReporteMontaje>> ObtenerReporteMontajes(DateTime desde, DateTime hasta) =>
            await _context.ObtenerReporteMontajes(desde, hasta);

    }
}
