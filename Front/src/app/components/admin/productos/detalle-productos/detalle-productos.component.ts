import {Component, OnInit} from '@angular/core';
import {ProductoService} from 'src/app/services/producto.service';

@Component({
  selector: 'app-detalle-productos',
  templateUrl: './detalle-productos.component.html',
  styleUrls: ['./detalle-productos.component.css']
})
export class DetalleProductosComponent implements OnInit {

  constructor(public productoService: ProductoService) {
  }

  ngOnInit(): void {
  }

}
