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
        Task<Producto> BuscarProducto(int id);
        Task<ActionResult<IEnumerable<DetalleProducto>>> listarProductos();
        Task<ActionResult<IEnumerable<Categoria>>> listarCategorias();
        Task<ActionResult<IEnumerable<Imagen>>> ListarImagenes();
        Task<ActionResult<IEnumerable<Imagen>>> ListaImagenesProducto(int id);
        Task<ActionResult<IEnumerable<DetalleProducto>>> ListarProductosPorCategoria(int idCategoria);
        Task<ActionResult<IEnumerable<DetallePrecioProducto>>> ListaPrecioProducto(int idProducto);
        Task<List<DetalleMaterialNombres>> ListarMaterialesProducto(int idProducto);
        Task EliminarDetalleMaterial(int id);
        Task EliminarImagen(int id);
        Task<Producto> AgregarProducto(Producto producto);
        Task<Producto> BuscarProductoPorId(int id);
        Task<Producto> EditarProducto(Producto producto);
        Task<DetalleProducto> DetalleProducto(int id);
        Task<ActionResult<IEnumerable<Material>>> ListaMatriales();
        Task AgregarImagen(FileImagenProducto archivoImagen);
        Task AgregarDetalleMaterialProducto(DetalleMaterial detalleMaterial);
        Task<PrecioProducto> AgregarPrecioProducto(PrecioProducto precioProducto);
        Task EditarFechaPrecio(int id);
        Task<ActionResult<IEnumerable<DetalleIva>>> listarIva();
        Task AgregarIva(Iva iva);
        Task ModificarIva(DateTime nueva);
        Task ModificaPrecio(DateTime nueva, int Id);
        Task<ActionResult<IEnumerable<DetalleEntradaProducto>>> ListarEntradasPorProducto(int idProducto);
        Task AgregarEntrada(Entrada entrada);
        Task<ActionResult<IEnumerable<PrecioProducto>>> ListaTodosPreciosProducto();
        public int ObtenerStockProducto(int idProducto);


    }
}
