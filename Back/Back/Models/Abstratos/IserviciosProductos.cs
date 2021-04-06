﻿using Back.Clases.Productos;
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
        Task<ActionResult<IEnumerable<DetalleProducto>>> listarProductos();
        Task<ActionResult<IEnumerable<Categoria>>> listarCategorias();
        Task<ActionResult<IEnumerable<Imagen>>> ListaImagenesProducto(int id);
        Task<ActionResult<IEnumerable<DetalleProducto>>> ListarProductosPorCategoria(int idCategoria);
        Task<ActionResult<IEnumerable<PrecioProducto>>> ListaPrecioProducto(int idProducto);
        Task<List<DetalleMaterialNombres>> ListarMaterialesProducto(int idProducto);
        Task<Producto> AgregarProducto(Producto producto);
        Task<Producto> BuscarProductoPorId(int id);
        Task EditarProducto(Producto producto);
        Task<DetalleProducto> DetalleProducto(int id);

        Task AgregarImagen(FileImagenProducto archivoImagen);
        Task AgregarDetalleMaterialProducto(DetalleMaterial detalleMaterial);
        Task AgregarPrecioProducto(PrecioProducto precioProducto);
        Task<ActionResult<IEnumerable<Iva>>> listarIva();
        Task AgregarIva(Iva iva);

        Task ModificarIva(DateTime nueva);


    }
}
