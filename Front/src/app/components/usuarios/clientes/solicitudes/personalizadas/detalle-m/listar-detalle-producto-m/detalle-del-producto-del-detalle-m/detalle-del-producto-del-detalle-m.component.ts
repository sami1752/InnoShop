import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../../../../../../../services/producto.service';

@Component({
  selector: 'app-detalle-del-producto-del-detalle-m',
  templateUrl: './detalle-del-producto-del-detalle-m.component.html',
  styleUrls: ['./detalle-del-producto-del-detalle-m.component.css']
})
export class DetalleDelProductoDelDetalleMComponent implements OnInit {

  constructor(public productoService: ProductoService) {
  }

  ngOnInit(): void {
    this.productoService.ListarDetalleMaterial(this.productoService.detalleProducto.IdProducto);
  }

}
