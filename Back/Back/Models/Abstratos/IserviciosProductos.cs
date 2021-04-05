using Back.Clases.Productos;
using Back.Models.Entidades.Productos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Abstratos
{
    public interface IserviciosProductos
    {
        Task<ActionResult<IEnumerable<Producto>>> listarProductos();
        Task<ActionResult<IEnumerable<Categoria>>> listarCategorias();
        Task<ActionResult<IEnumerable<Imagen>>> ListaImagenesProducto(int id);
        Task AgregarProducto(Producto producto);

        Task AgregarImagen(FileImagenProducto archivoImagen);
        Task EditarProducto(Producto producto);
    }
}
