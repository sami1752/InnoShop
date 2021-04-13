using Back.Clases.Productos;
using Back.Models.Abstratos;
using Back.Models.DAL;
using Back.Models.Entidades.Productos;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Servicios
{
    public class ServiciosProductos : IserviciosProductos
    {
        private readonly DBContext _context;
        private readonly IWebHostEnvironment _environment;

        public ServiciosProductos(DBContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }



        public async Task<ActionResult<IEnumerable<DetalleProducto>>> listarProductos()
        {

            await using (_context)
            {
                List<DetalleProducto> ListaProductos = (from producto in _context.Productos
                                                        join categoria in _context.Categorias
                                                        on producto.IdCategoria equals categoria.IdCategoria
                                                        select new DetalleProducto
                                                        {
                                                            IdProducto = producto.IdProducto,
                                                            Nombre = producto.Nombre,
                                                            Estado = producto.Estado,
                                                            Ancho = producto.Ancho,
                                                            Largo = producto.Largo,
                                                            Fondo = producto.Fondo,
                                                            TipoPuerta = producto.TipoPuerta,
                                                            Descripcion = producto.Descripcion,
                                                            Ruedas = producto.Ruedas,
                                                            IdUsuario = producto.IdUsuario,
                                                            IdCategoria = producto.IdCategoria,
                                                            Puntos = producto.Puntos,
                                                            NombreCategoria = categoria.Nombre,
                                                            GarantiaMeses = producto.GarantiaMeses,
                                                        }).ToList();
                return ListaProductos;
            }


        }

        public async Task<ActionResult<IEnumerable<Imagen>>> ListarImagenes() => await _context.Imagenes.ToListAsync();
        public async Task<ActionResult<IEnumerable<Imagen>>> ListaImagenesProducto(int id) =>
             await _context.Imagenes.Where(x => x.IdProducto == id).ToListAsync();
        
        public async Task<ActionResult<IEnumerable<Categoria>>> listarCategorias() => await _context.Categorias.ToListAsync();

        public async Task<ActionResult<IEnumerable<DetalleProducto>>> ListarProductosPorCategoria(int idCategoria)
        {
            await using (_context)
            {
                List<DetalleProducto> listaProductosPorCategoria = (from producto in _context.Productos
                                                                    join categoria in _context.Categorias
                                                                    on producto.IdCategoria equals categoria.IdCategoria
                                                                    /*join precioProducto in _context.PrecioProductos
                                                                    on producto.IdProducto equals precioProducto.IdProducto*/
                                                                    where producto.IdCategoria == idCategoria
                                                                    select new DetalleProducto
                                                                    {
                                                                        IdProducto = producto.IdProducto,
                                                                        Nombre = producto.Nombre,
                                                                        Estado = producto.Estado,
                                                                        Ancho = producto.Ancho,
                                                                        Largo = producto.Largo,
                                                                        Fondo = producto.Fondo,
                                                                        TipoPuerta = producto.TipoPuerta,
                                                                        Descripcion = producto.Descripcion,
                                                                        Ruedas = producto.Ruedas,
                                                                        IdUsuario = producto.IdUsuario,
                                                                        IdCategoria = producto.IdCategoria,
                                                                        Puntos = producto.Puntos,
                                                                        NombreCategoria = categoria.Nombre,
                                                                        GarantiaMeses = producto.GarantiaMeses,
                                                                        //Precio = precioProducto.Precio
                                                                    }).ToList();
                return listaProductosPorCategoria;
            }
        }

        public async Task<ActionResult<IEnumerable<PrecioProducto>>> ListaPrecioProducto(int idProducto)
        {
            return await _context.PrecioProductos.Where(x => x.IdProducto == idProducto).ToListAsync();
        }
        public async Task<ActionResult<IEnumerable<PrecioProducto>>> ListaTodosPreciosProducto()
        {
            return await _context.PrecioProductos.ToListAsync();
        }

        public async Task<Producto> AgregarProducto(Producto producto)
        {
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return producto;
        }


        public async Task<Producto> BuscarProductoPorId(int id) => await _context.Productos.FindAsync(id);


        public async Task<Producto> EditarProducto(Producto producto)
        {
            _context.Productos.Update(producto);
            await _context.SaveChangesAsync();
            return producto;
        }

        public async Task EditarFechaPrecio(int id)
        {

            PrecioProducto precioD = await _context.PrecioProductos.FindAsync(id);
            precioD.FechaFin = DateTime.Now;
            _context.PrecioProductos.Update(precioD);
        }

        public async Task AgregarImagen(FileImagenProducto archivoImagen)
        {
            string nombreimagen = string.Join("", DateTime.Now.ToString().Split('/', ':')) + archivoImagen.Imagen.FileName;
            await archivoImagen.Imagen.CopyToAsync(new System.IO.FileStream("..//..//Front//src//assets//img/Imagenes/" + nombreimagen, System.IO.FileMode.Create));

            Imagen imagen = new()
            {
                RutaImagen = nombreimagen,
                IdProducto = archivoImagen.IdProducto,
                IdUsuario = archivoImagen.IdUsuario
            };
            await _context.Imagenes.AddAsync(imagen);
            await _context.SaveChangesAsync();
        }


        public async Task AgregarDetalleMaterialProducto(DetalleMaterial detalleMaterial)
        {
            _context.DetalleMateriales.Add(detalleMaterial);
            await _context.SaveChangesAsync();
        }

        public async Task EliminarDetalleMaterial(int id)
        {
            DetalleMaterial detalleMaterial = await _context.DetalleMateriales.FindAsync(id);
            _context.DetalleMateriales.Remove(detalleMaterial);
            await _context.SaveChangesAsync();
        }

        public async Task EliminarImagen(int id)
        {
            Imagen Imagen = await _context.Imagenes.FindAsync(id);
            _context.Imagenes.Remove(Imagen);
            await _context.SaveChangesAsync();
        }

        public async Task<List<DetalleMaterialNombres>> ListarMaterialesProducto(int idProducto)
        {
            await using (_context)
            {
                List<DetalleMaterialNombres> listaMateriales = (from productos in _context.Productos
                                                                join detalleM in _context.DetalleMateriales
                                                                on productos.IdProducto equals detalleM.IdProducto
                                                                join material in _context.Materiales
                                                                on detalleM.IdMaterial equals material.IdMaterial
                                                                where detalleM.IdProducto == idProducto

                                                                select new DetalleMaterialNombres
                                                                {
                                                                    IdDetalleMaterial = detalleM.IdDetalleMaterial,
                                                                    IdMaterial = detalleM.IdMaterial,
                                                                    IdProducto = detalleM.IdProducto,
                                                                    NombreMaterial = material.Nombre,
                                                                    IdUsuario = detalleM.IdUsuario,
                                                                    Descripcion = material.Descripcion
                                                                }).ToList();
                return listaMateriales;
            }
        }

        public async Task<PrecioProducto> AgregarPrecioProducto(PrecioProducto precioProducto)
        {
            _context.PrecioProductos.Add(precioProducto);
            await _context.SaveChangesAsync();
            return precioProducto;
        }



        public async Task<DetalleProducto> DetalleProducto(int id)
        {
            await using (_context)
            {
                List<DetalleProducto> detalleProducto = (from producto in _context.Productos
                                                         join categoria in _context.Categorias
                                                         on producto.IdCategoria equals categoria.IdCategoria
                                                         join precioProducto in _context.PrecioProductos
                                                         on producto.IdProducto equals precioProducto.IdProducto
                                                         where producto.IdProducto == id

                                                         select new DetalleProducto
                                                         {
                                                             IdProducto = producto.IdProducto,
                                                             Nombre = producto.Nombre,
                                                             Estado = producto.Estado,
                                                             Ancho = producto.Ancho,
                                                             Largo = producto.Largo,
                                                             Fondo = producto.Fondo,
                                                             TipoPuerta = producto.TipoPuerta,
                                                             Descripcion = producto.Descripcion,
                                                             Ruedas = producto.Ruedas,
                                                             IdUsuario = producto.IdUsuario,
                                                             Puntos = producto.Puntos,
                                                             NombreCategoria = categoria.Nombre,
                                                             GarantiaMeses = producto.GarantiaMeses,
                                                             Precio = precioProducto.Precio
                                                         }).ToList();
                return detalleProducto[detalleProducto.Count() - 1];
            }


        }

        public async Task<ActionResult<IEnumerable<Iva>>> listarIva() => await _context.Iva.ToListAsync();

        public async Task AgregarIva(Iva iva)
        {
            _context.Iva.Add(iva);
            await _context.SaveChangesAsync();
        }

        public async Task ModificarIva(DateTime nueva)
        {
            List<Iva> iva = (from ival in _context.Iva
                             orderby ival.IdIva descending
                             select new Iva
                             {
                                 IdIva = ival.IdIva,
                                 FechaFin = ival.FechaFin,
                                 FechaInicio = ival.FechaInicio,
                                 IdUsuario = ival.IdUsuario,
                                 Porcentaje = ival.Porcentaje

                             }).ToList();
            iva[0].FechaFin = nueva;
            _context.Iva.Update(iva[0]);
            await _context.SaveChangesAsync();
        }


        public async Task ModificaPrecio(DateTime nueva, int Id)
        {
            List<PrecioProducto> Precio = (from preciol in _context.PrecioProductos
                                           where preciol.IdProducto == Id
                                           orderby preciol.IdPrecioProducto descending
                                           select new PrecioProducto
                                           {
                                               IdPrecioProducto = preciol.IdPrecioProducto,
                                               FechaFin = preciol.FechaFin,
                                               FechaInicio = preciol.FechaInicio,
                                               IdUsuario = preciol.IdUsuario,
                                               Precio = preciol.Precio,
                                               IdProducto = preciol.IdProducto

                                           }).ToList();
            Precio[0].FechaFin = nueva;
            _context.PrecioProductos.Update(Precio[0]);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<IEnumerable<Material>>> ListaMatriales()  => await _context.Materiales.ToListAsync();

        public async Task<ActionResult<IEnumerable<DetalleEntrada>>> ListarEntradas()
        {
            await using (_context)
            {
                List<DetalleEntrada> detalleEntrada = (from producto in _context.Productos
                                                         join entrada in _context.Entradas
                                                         on producto.IdProducto equals entrada.IdProducto
                                                         join Usuario in _context.Usuarioidentity
                                                         on entrada.IdUsuario equals Usuario.Id
                                               

                                                         select new DetalleEntrada
                                                         {
                                                             IdEntrada = entrada.IdEntrada,
                                                             IdProducto = entrada.IdProducto,
                                                             Fecha = entrada.Fecha,
                                                             IdUsuario = entrada.IdUsuario,
                                                             NombreProducto = producto.Nombre,
                                                             NombreUsuario = Usuario.Nombres,
                                                             Cantidad = entrada.Cantidad
                                                         }).ToList();
                return detalleEntrada;
            }
        }
        public async Task AgregarEntrada(Entrada entrada)
        {
            entrada.Fecha = DateTime.Now;
            _context.Entradas.Add(entrada);
            await _context.SaveChangesAsync();
        }




    }

}

