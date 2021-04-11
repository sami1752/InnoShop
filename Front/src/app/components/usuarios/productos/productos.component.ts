import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(public productoService:ProductoService ) { }

  ngOnInit(): void {
    this.productoService.listarProducto()
    this.productoService.listarImagenes()
  }

}
