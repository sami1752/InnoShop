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

        public async Task<Producto> BuscarProducto(int id) => await _context.Productos.FindAsync(id);

        public async Task<ActionResult<IEnumerable<DetalleProducto>>> listarProductos()
        {

            await using (_context)
            {
                List<DetalleProducto> ListaProductos = (from producto in _context.Productos
                                                        join categoria in _context.Categorias
                                                        on producto.IdCategoria equals categoria.IdCategoria
                                                        orderby producto.IdCategoria descending
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
                                                            GarantiaMeses = producto.GarantiaMeses
                                                        }).ToList();
                return ListaProductos;
            }


        }

        public async Task<ActionResult<IEnumerable<Imagen>>> ListarImagenes()
        {
            var l = await _context.Imagenes.ToListAsync();

            await using (_context)
            {
                return l.GroupBy(x => x.IdProducto).Select(x => x.First()).ToList();
            }

        }

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
                                                                        GarantiaMeses = producto.GarantiaMeses
                                                                    }).ToList();
                return listaProductosPorCategoria;
            }
        }

        public async Task<ActionResult<IEnumerable<DetallePrecioProducto>>> ListaPrecioProducto(int idProducto)
        {
            await using (_context)
            {
                var listaPreciosProd = (from pre in _context.PrecioProductos
                                        join us in _context.Usuarioidentity
                                        on pre.IdUsuario equals us.Id
                                        join pro in _context.Productos on pre.IdProducto equals pro.IdProducto
                                        where pre.IdProducto == idProducto
                                        select new DetallePrecioProducto
                                        {
                                            IdPrecioProducto = pre.IdPrecioProducto,
                                            Precio = pre.Precio,
                                            IdProducto = pre.IdProducto,
                                            FechaFin = pre.FechaFin,
                                            FechaInicio = pre.FechaInicio,
                                            IdUsuario = pre.IdUsuario,
                                            NombreProducto = pro.Nombre,
                                            NombreUsuario = us.Nombres + " " + us.Apellidos
                                        }).ToList();
                return listaPreciosProd;
            }

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
                                                                join Usuario in _context.Usuarioidentity
                                                                on material.IdUsuario equals Usuario.Id
                                                                where detalleM.IdProducto == idProducto

                                                                select new DetalleMaterialNombres
                                                                {
                                                                    IdDetalleMaterial = detalleM.IdDetalleMaterial,
                                                                    IdMaterial = detalleM.IdMaterial,
                                                                    IdProducto = detalleM.IdProducto,
                                                                    NombreMaterial = material.Nombre,
                                                                    IdUsuario = detalleM.IdUsuario,
                                                                    Usuario = Usuario.Nombres + " " + Usuario.Apellidos,
                                                                    Descripcion = material.Descripcion
                                                                }).ToList();
                return listaMateriales;
            }
        }

        public async Task<PrecioProducto> AgregarPrecioProducto(PrecioProducto precioProducto)
        {
            precioProducto.FechaInicio = DateTime.Now;
            _context.PrecioProductos.Add(precioProducto);
            await _context.SaveChangesAsync();
            return precioProducto;
        }



        public async Task<DetalleProducto> DetalleProducto(int id)
        {
            await using (_context)
            {
                DetalleProducto detalleProducto = (from producto in _context.Productos
                                                   join categoria in _context.Categorias
                                                   on producto.IdCategoria equals categoria.IdCategoria
                                                   join precioProducto in _context.PrecioProductos
                                                   on producto.IdProducto equals precioProducto.IdProducto
                                                   join usuario in _context.Usuarioidentity
                                                   on producto.IdUsuario equals usuario.Id
                                                   where producto.IdProducto == id && precioProducto.FechaFin == new DateTime()
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
                                                       Precio = precioProducto.Precio,
                                                       Usuario = usuario.Nombres + " " + usuario.Apellidos,
                                                       CantidadStock = this.ObtenerStockProducto(id)
                                                   }).First();

                return detalleProducto;
            }


        }

        public async Task<ActionResult<IEnumerable<DetalleIva>>> listarIva()
        {
            await using (_context)
            {
                var listaIva = (from iva in _context.Iva
                                join us in _context.Usuarioidentity
                                on iva.IdUsuario equals us.Id
                                select new DetalleIva
                                {
                                    IdIva = iva.IdIva,
                                    IdUsuario = iva.IdUsuario,
                                    FechaFin = iva.FechaFin,
                                    FechaInicio = iva.FechaInicio,
                                    NombreUsuario = us.Nombres + " " + us.Apellidos,
                                    Porcentaje = iva.Porcentaje
                                }).ToList();
                return listaIva;
            }
        }

        public async Task AgregarIva(Iva iva)
        {
            iva.FechaInicio = DateTime.Now;
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

        public async Task<ActionResult<IEnumerable<Material>>> ListaMatriales() => await _context.Materiales.ToListAsync();

        public async Task<ActionResult<IEnumerable<DetalleEntradaProducto>>> ListarEntradasPorProducto(int idProducto)
        {
            await using (_context)
            {
                var listaEntradasProd = (from ent in _context.Entradas
                                         join us in _context.Usuarioidentity
                                         on ent.IdUsuario equals us.Id
                                         where ent.IdProducto == idProducto
                                         select new DetalleEntradaProducto
                                         {
                                             IdEntrada = ent.IdEntrada,
                                             Cantidad = ent.Cantidad,
                                             Fecha = ent.Fecha,
                                             IdProducto = ent.IdProducto,
                                             IdUsuario = ent.IdUsuario,

                                             NombreUsuario = us.Nombres + " " + us.Apellidos
                                         }).ToList();
                return listaEntradasProd;
            }
        }
        public async Task AgregarEntrada(Entrada entrada)
        {
            entrada.Fecha = DateTime.Now;
            _context.Entradas.Add(entrada);
            await _context.SaveChangesAsync();
        }

        public int ObtenerStockProducto(int idProducto)
        {
            int entradas = _context.Entradas.Where(x => x.IdProducto == idProducto).Sum(x => x.Cantidad);
            int salidas = _context.Salidas.Where(x => x.IdProducto == idProducto).Sum(x => x.Cantidad);
            return salidas == 0 ? entradas : entradas - salidas;
        }




    }

}

