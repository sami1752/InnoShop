using Back.Clases.Productos;
using Back.Models.Abstratos;
using Back.Models.Entidades.Productos;
using Microsoft.AspNetCore.Hosting;
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
    public class ProductosController : ControllerBase
    {
        private IserviciosProductos _context;
        

        public ProductosController(IserviciosProductos context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos() =>  await _context.listarProductos();
        
        [HttpGet]
        [Route("Categorias")]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategoria() => await _context.listarCategorias();

        [HttpPost]
        [Route("Registro")]
        public async Task<Object> RegistroProducto(Producto producto)
        {
                try
                {
                    await _context.AgregarProducto(producto);
                    
                    return Ok(new { mensaje = "Registro exitoso" });
                }
                catch (Exception e)
                {

                    return e.Message;
                }
            
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<Object> Editarproducto(Producto producto)
        {
            try
            {
                await _context.EditarProducto(producto);
                return Ok(new { mensaje = "edición exitosa" });
            }
            catch (Exception e)
            {

                return e.Message;
            }
        }


        

        [HttpPost]
        [Route("Imagen")]
        public async Task<Object> GuardarImagen([FromForm] FileImagenProducto imagen)
        {
            try
            {
                if (imagen.Imagen!=null)
                {
                    await _context.AgregarImagen(imagen);
                    return Ok(new { mensaje = "exito" });
                }
                else
                {
                    return BadRequest(new { mensaje = "No se detecto archivo" });
                }
                
            }
            catch (Exception e)
            {
                return e.Message;
            }

        }

       [HttpGet]
       [Route("ListaImagenes/{id}")]
       public async Task<ActionResult<IEnumerable<Imagen>>> GetImagenes(int id)
        {
            try
            {
                if (id != 0)
                {
                    return await _context.ListaImagenesProducto(id);
                }
                else
                {
                    return BadRequest(new { mensaje = "error al listar las imagenes" });
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
