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
        private IWebHostEnvironment _environment;

        public ServiciosProductos(DBContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }



        public async Task<ActionResult<IEnumerable<Producto>>> listarProductos() => await _context.Productos.ToListAsync();
        public async Task<ActionResult<IEnumerable<Imagen>>> ListaImagenesProducto(int id)
        {
            return await _context.Imagenes.Where(x => x.IdProducto == id).ToListAsync();
        }
        public async Task<ActionResult<IEnumerable<Categoria>>> listarCategorias() => await _context.Categorias.ToListAsync();

        public async Task AgregarProducto(Producto producto)
        {
            var res = _context.Productos.Add(producto);
            await _context.SaveChangesAsync();
        }

        public async Task EditarProducto(Producto producto)
        {
            _context.Productos.Update(producto);
            await _context.SaveChangesAsync();
        }

        public async Task AgregarImagen(FileImagenProducto archivoImagen)
        {
            string rutaImagen = System.IO.Path.Combine(_environment.ContentRootPath, "Imagenes", archivoImagen.Imagen.FileName);
            await archivoImagen.Imagen.CopyToAsync(new System.IO.FileStream(rutaImagen, System.IO.FileMode.Create));

            Imagen imagen = new()
            {
                RutaImagen = rutaImagen,
                IdProducto = archivoImagen.IdProducto,
                IdUsuario = archivoImagen.IdUsuario
            };
            await _context.Imagenes.AddAsync(imagen);
            await _context.SaveChangesAsync();
        }

       
        
    }
}
