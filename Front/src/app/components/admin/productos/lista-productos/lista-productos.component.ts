import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  constructor(private router:Router, public productoService:ProductoService) { }

  ngOnInit(): void {
    this.productoService.listarProducto();
    this.productoService.listarCategorias();
  }
  llenarFormularioProducto(producto:Producto){
    this.productoService.CampoPrecio = false
    this.productoService.formularioRegistroProductos.patchValue(producto);
    this.productoService.desplegarDetalleMateriales =true;
    this.productoService.tablaDetalleMateriales =true;
    this.productoService.idProducto1 = producto.IdProducto;
    this.productoService.ListarDetalleMaterial(producto.IdProducto);
  }
  eliminarProducto(producto:Producto){
    if (confirm("¿Estás seguro de desactivar el Producto?")) {
      this.productoService.eliminarProducto(producto).subscribe(
        res=>{
          this.productoService.listarProducto();
          alert(res);
        },
        err=>{
          alert(err.code);
        }
      );
    }
  }
  detalleProducto(id){
    this.productoService.buscarProductoIdDetalle(id);
    this.productoService.listarPrecios(id);
    this.productoService.ListarDetalleMaterial(id);
  }

  tomarIdProducto(id){
    this.productoService.precio.IdProducto = id
  }

}
