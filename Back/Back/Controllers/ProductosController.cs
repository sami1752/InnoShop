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

        public ProductosController(IserviciosProductos context) => _context = context;

        [HttpGet]
        [Route("Buscar/{Producto}")]
        public async Task<ActionResult<Producto>> BuscarMontajes(int Producto) => await _context.BuscarProducto(Producto);

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetalleProducto>>> GetProductos() => await _context.listarProductos();

        [HttpGet]
        [Route("Categorias")]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategoria() => await _context.listarCategorias();

        [HttpGet]
        [Route("ProductosPorCategoria/{idCategoria}")]
        public async Task<ActionResult<IEnumerable<DetalleProducto>>> listaProductosPorCategoria(int idCategoria) =>
            await _context.ListarProductosPorCategoria(idCategoria);


        [HttpPost]
        [Route("Registro")]
        public async Task<Object> RegistroProducto(DetalleProducto Rproducto)
        {
            try
            {
                Producto producto = new Producto()
                {
                    Nombre = Rproducto.Nombre,
                    Estado = Rproducto.Estado,
                    Ancho = Rproducto.Ancho,
                    Largo = Rproducto.Largo,
                    Fondo = Rproducto.Fondo,
                    TipoPuerta = Rproducto.TipoPuerta,
                    Descripcion = Rproducto.Descripcion,
                    Ruedas = Rproducto.Ruedas,
                    IdUsuario = Rproducto.IdUsuario,
                    Puntos = Rproducto.Puntos,
                    IdCategoria = Rproducto.IdCategoria,
                    GarantiaMeses = Rproducto.GarantiaMeses
                };

                producto = await _context.AgregarProducto(producto);

                PrecioProducto precioP = new PrecioProducto()
                {
                    Precio = Rproducto.Precio,
                    FechaInicio = DateTime.Now,
                    IdProducto = producto.IdProducto,
                    IdUsuario = producto.IdUsuario,
                    //FechaFin = new DateTime(0000, 0, 0, 0, 0, 0)
                };
                await _context.AgregarPrecioProducto(precioP);

                    Entrada entrada = new Entrada()
                    {
                        IdProducto = producto.IdProducto,
                        Cantidad = Rproducto.CantidadStock,
                        IdUsuario = Rproducto.IdUsuario,
                        Fecha = DateTime.Now
                    };
                    await _context.AgregarEntrada(entrada);

                    return Ok(new { mensaje = producto.IdProducto });
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
                return Ok(new { mensaje = "Actializacion exitosa" });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpPost]
        [Route("AgregarPrecio")]
        public async Task<Object> AgregarPrecio(PrecioProducto precio)
        {
            try
            {
                precio.FechaInicio = DateTime.Now;
                await _context.ModificaPrecio(precio.FechaInicio, precio.IdProducto);
                await _context.AgregarPrecioProducto(precio);
                return Ok(new { mensaje = "Registro exitoso" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("ProductoPorId/{idProducto}")]
        public async Task<Producto> ProductoPorId(int idProducto) =>
            await _context.BuscarProductoPorId(idProducto);


        [HttpGet]
        [Route("Detalle/{id}")]
        public async Task<DetalleProducto> DetalleProducto(int id)
        {
            try
            {
                return await _context.DetalleProducto(id);
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("Imagen")]
        public async Task<Object> GuardarImagen([FromForm] FileImagenProducto imagen)
        {
            try
            {
                if (imagen.Imagen != null)
                {
                    await _context.AgregarImagen(imagen);
                    return Ok(new { mensaje = "exito" });
                }
                else return BadRequest(new { mensaje = "No se detecto archivo" });
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
                    return await _context.ListaImagenesProducto(id);
                else
                    return BadRequest(new { mensaje = "error al listar las imagenes" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("ListarImagenes")]
        public async Task<ActionResult<IEnumerable<Imagen>>> GetImagen() => await _context.ListarImagenes();

        [HttpGet]
        [Route("ListaMateriales")]
        public async Task<ActionResult<IEnumerable<Material>>> listaMateriales() => 
             await _context.ListaMatriales();
        

        [HttpGet]
        [Route("ListaDetalleMateriales/{idProducto}")]
        public async Task<ActionResult<IEnumerable<DetalleMaterialNombres>>> listaDetalleMateriales(int idProducto) =>
             await _context.ListarMaterialesProducto(idProducto);
        

        [HttpPost]
        [Route("AgregarDetalleMaterial")]
        public async Task<Object> AgregarDetalleMaterial(DetalleMaterial detalleMaterial)
        {
            try
            {
                await _context.AgregarDetalleMaterialProducto(detalleMaterial);
                return Ok(new { mensaje = "Registro exitoso" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete]
        [Route("EliminarImagen/{idImagen}")]
        public async Task<Object> EliminarImagen(int idImagen)
        {
            try
            {
                await _context.EliminarImagen(idImagen);
                return Ok(new { mensaje = "Eliminación Exitosa" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete]
        [Route("EliminarMaterial/{idDetalle}")]
        public async Task<Object> EliminarMaterial(int idDetalle)
        {
            try
            {
                await _context.EliminarDetalleMaterial(idDetalle);
                return Ok(new { mensaje = "Eliminación Exitosa" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("ListarIva")]
        public async Task<ActionResult<IEnumerable<Iva>>> listarIva() => await _context.listarIva();

        [HttpPut]
        [Route("AgregarIva")]
        public async Task<Object> AgregarIva(Iva iva)
        {
            try
            {
                iva.FechaInicio = DateTime.Now;
                await _context.ModificarIva(iva.FechaInicio);
                await _context.AgregarIva(iva);
                return Ok(new { mensaje = "Iva agregado exitosamente" });
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [HttpGet]
        [Route("listaPrecioProducto/{idProducto}")]
        public async Task<ActionResult<IEnumerable<PrecioProducto>>> ListaPrecioProducto(int idProducto)
        {
            return await _context.ListaPrecioProducto(idProducto);
        }
        [HttpGet]
        [Route("listaPrecioProductos")]
        public async Task<ActionResult<IEnumerable<PrecioProducto>>> ListaPrecioTodosProducto()
        {
            return await _context.ListaTodosPreciosProducto();
        }


        [HttpGet]
        [Route("listarEntradas/{idProducto}")]
        public async Task<ActionResult<IEnumerable<Entrada>>> ListaEntradas(int idProducto)
        {
            return await _context.ListarEntradasPorProducto( idProducto);
        }

        [HttpPost]
        [Route("AgregarEntrada")]
        public async Task<Object> AgregarEntradaProducto(Entrada entrada)
        {
            try
            {
                await _context.AgregarEntrada(entrada);
                return Ok(new { mensaje = "Entrada agregada exitosamente" });
            }
            catch (Exception e)
            {  
                return e.Message;
            }
        }

        [HttpGet]
        [Route("stock/{idProducto}")]
        public int StockProducto(int idProducto)
        {
            return  _context.ObtenerStockProducto(idProducto);
        }


    }
}
