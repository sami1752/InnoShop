import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-detalle-venta-producto',
  templateUrl: './detalle-venta-producto.component.html',
  styleUrls: ['./detalle-venta-producto.component.css']
})
export class DetalleVentaProductoComponent implements OnInit {

  constructor(public ventasService:VentasService) { }

  ngOnInit(): void {
  }

}
