using Back.Clases.Descuentos;
using Back.Models.Abstratos;
using Back.Models.Entidades.Descuentos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DescuentosController : ControllerBase
    {
        private IServiciosDescuentos _context;
        public DescuentosController(IServiciosDescuentos context) => _context = context;

        [HttpGet]
        [Route("{idUsuario}")]
        public async Task<ActionResult<IEnumerable<DetalleDescuentos>>> ListaDescuentosPorUsuario(string idUsuario) =>
            await _context.ListarDescuentos(idUsuario);

        [HttpGet]
        [Route("Porcentajes")]
        public async Task<ActionResult<IEnumerable<PorcentajesRuleta>>> listarPorcentajesRuleta() =>
            await _context.ListarPorcentajesRuleta();

        [HttpGet]
        [Route("ValoresRuleta")]
        public async Task<IEnumerable<ValorRuleta>> ListarValoresRuleta() =>
            await _context.ListarValoresRuleta();

        [HttpGet]
        [Route("ValorActualRuleta")]
        public async Task<ValorRuleta> ValorActualRuleta() =>
           await _context.ObtenerValorRuletaActual();

        [HttpPost]
        public async Task<Object> RegistrarCuponDescuento(Descuentos descuento)
        {
            try
            {
                await _context.RegistrarCuponDescuento(descuento);
                await _context.EditarPuntosUsuario(descuento.IdUsuario);
                return Ok(new { mensaje = "Cupon de descuento obtenido" });
            }
            catch (Exception e)
            {

                return e.Message;
            }
        }

        [HttpPost]
        [Route("AgregarValorRuleta")]
        public async Task<Object> AgregarPuntajeValorRuleta(ValorRuleta valorRuleta)
        {
            try
            {
                IEnumerable<ValorRuleta> list  = await _context.ListarValoresRuleta();
                if (list.Count() == 0)
                {
                    await _context.AgregarPuntuacionNueva(valorRuleta);
                }
                else
                {
                    await _context.EditarValorRuleta(valorRuleta.FechaInicio);
                    await _context.AgregarPuntuacionNueva(valorRuleta);
                }
                
                return Ok(new { mensaje = "Puntaje nuevo agregado con éxito" });
            }
            catch (Exception e)
            {

                return e.Message;
            }
        }

        [HttpPost]
        [Route("AgregarPorcentaje")]
        public async Task<Object> AgregarPorcentajeRuleta(PorcentajesRuleta porcentaje)
        {
            try
            {
                await _context.AgregarPorcentajeRuleta(porcentaje);
                return Ok(new { mensaje = "Porcentaje nuevo agregado con éxito" });
            }
            catch (Exception e)
            {

                return e.Message;
            }
        }

        [HttpPut]
        [Route("editarPorcentaje")]
        public async Task<Object> EditarPorcentaje(PorcentajesRuleta porcentaje)
        {
            try
            {
                await _context.EditarPorcentajeRuleta(porcentaje);
                return Ok(new { mensaje = "Edición exitosa" });
            }
            catch (Exception e)
            {

                return e.Message;
            }
        }

        [HttpPut]
        [Route("editarCupon")]
        public async Task<Object> EditarCupon(Descuentos descuento)
        {
            try
            {
                await _context.EditarCuponDescuento(descuento);
                return Ok(new { mensaje = "Edición exitosa" });
            }
            catch (Exception e)
            {

                return e.Message;
            }
        }


    }
}
