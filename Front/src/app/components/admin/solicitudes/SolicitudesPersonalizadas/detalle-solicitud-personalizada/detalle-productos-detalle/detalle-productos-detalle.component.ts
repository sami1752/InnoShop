import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-detalle-productos-detalle',
  templateUrl: './detalle-productos-detalle.component.html',
  styleUrls: ['./detalle-productos-detalle.component.css']
})
export class DetalleProductosDetalleComponent implements OnInit {

  constructor(public productoService:ProductoService) { }

  ngOnInit(): void {
  }

}
