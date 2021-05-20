import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../../../../../services/producto.service';

@Component({
  selector: 'app-detalle-producto-detalle-m',
  templateUrl: './detalle-producto-detalle-m.component.html',
  styleUrls: ['./detalle-producto-detalle-m.component.css']
})
export class DetalleProductoDetalleMComponent implements OnInit {

  constructor(public productoService: ProductoService) {
  }

  ngOnInit(): void {
    this.productoService.ListarDetalleMaterial(this.productoService.detalleProducto.IdProducto);
  }

}
