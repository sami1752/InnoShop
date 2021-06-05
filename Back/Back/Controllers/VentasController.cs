using Back.Clases.Ventas;
using Back.Models.Abstratos;
using Back.Models.Entidades.Productos;
using Back.Models.Entidades.Ventas;
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
    public class VentasController : ControllerBase
    {
        private readonly IServiciosVentas _context;
        public VentasController(IServiciosVentas context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetalleVenta>>> ListarVentas() => await _context.ListarVentas();

        [HttpGet]
        [Route("compras/{idUsuario}")]
        public async Task<ActionResult<IEnumerable<Ventas>>> ListarVentasPorCliente(string idUsuario) => await _context.ListaVentasPorCliente(idUsuario);



        [HttpGet]
        [Route("detalleVentaProductos/{idVenta}")]
        public async Task<ActionResult<IEnumerable<DetalleVentaProductoInfo>>> ListaDetalleVentaProductos(int idVenta)
            => await _context.ListarDetalleVentaProductos(idVenta);

        [HttpGet("{idVenta}")]
        public async Task<DetalleVenta> DetalleVenta(int idVenta)
            => await _context.DetalleVenta(idVenta);

        [HttpPost]
        public async Task<Object> AgregarVenta(Ventas venta)
        {
            try
            {
                return await _context.AgregarVenta(venta);
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpPost]
        [Route("AgregarProducto")]
        public async Task<Object> AgregarDetalleProducto(DetalleVentaProductos detalle)
        {
            try
            {
                await _context.AgregarDetalleVentaProducto(detalle);
                return Ok(new { mensaje = "Registro de detalle exitoso" });
            }
            catch (Exception e)
            {

                return e.Message;
            }
        }

        [HttpPost]
        [Route("DetalleVentaSolicitud")]
        public async Task<Object> AgregarDetalleVentaSolicitudes(DetalleVentaSolicitudes detalle)
        {
            try
            {
                await _context.AgregarDetalleVentaSolicitudes(detalle);
                return Ok(new { mensaje = "Registro de detalle exitoso" });
            }
            catch (Exception e)
            {

                return e.Message;
            }
        }

        [HttpPost]
        [Route("DetalleVentaMontaje")]
        public async Task<Object> AgregarDetalleVentaMontaje(DetalleVentaMontajes detalle)
        {
            try
            {
                await _context.AgregarDetalleVentaMontajes(detalle);
                return Ok(new { mensaje = "Registro de detalle exitoso" });
            }
            catch (Exception e)
            {

                return e.Message;
            }
        }

        [HttpGet]
        [Route("IvaActual")]
        public async Task<Iva> ObtenerIva()
          => await _context.ObtenerIvaActual();

        [HttpGet]
        [Route("PrecioProducto/{idProducto}")]
        public async Task<PrecioProducto> PrecioProd(int idProducto)
          => await _context.ObtenerPrecioProducto(idProducto);

        [HttpGet]
        [Route("Salidas/{idProducto}")]
        public async Task<ActionResult<IEnumerable<SalidaProductoInfo>>> listarSalidas(int idProducto)
          => await _context.listarSalidas(idProducto);

        [HttpPost]
        [Route("AgregarSalida")]
        public async Task<Object> AgregarSalida(Salida salida)
        {
            try
            {
                await _context.AgregarSalidaProducto(salida);
                return Ok(new { mensaje = "Registro exitoso" });
            }
            catch (Exception e)
            {

                return e.Message;
            }
        }
    }
}
