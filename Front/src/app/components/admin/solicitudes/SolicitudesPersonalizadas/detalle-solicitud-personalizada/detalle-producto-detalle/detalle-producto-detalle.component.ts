import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-detalle-producto-detalle',
  templateUrl: './detalle-producto-detalle.component.html',
  styleUrls: ['./detalle-producto-detalle.component.css']
})
export class DetalleProductoDetalleComponent implements OnInit {

  constructor(public productoService:ProductoService) { }
  
  ngOnInit(): void {
    this.productoService.ListarDetalleMaterial(this.productoService.detalleProducto.IdProducto);
  }

}
