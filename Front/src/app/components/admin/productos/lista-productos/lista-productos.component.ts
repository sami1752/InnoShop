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
    this.productoService.formularioRegistroProductos.patchValue(producto);
  }
  eliminarProducto(producto:Producto){
    if (confirm("¿Estás seguro de desactivar el Producto?")) {
      this.productoService.eliminarProducto(producto).subscribe(
        res=>{
          this.productoService.listarProducto();
          console.log(res);
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
  }
}
