import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../../../../../../../services/producto.service';

@Component({
  selector: 'app-detalle-del-producto-del-detalle',
  templateUrl: './detalle-del-producto-del-detalle.component.html',
  styleUrls: ['./detalle-del-producto-del-detalle.component.css']
})
export class DetalleDelProductoDelDetalleComponent implements OnInit {

  constructor(public productoService: ProductoService) {
  }

  ngOnInit(): void {
    this.productoService.ListarDetalleMaterial(this.productoService.detalleProducto.IdProducto);
  }

}
