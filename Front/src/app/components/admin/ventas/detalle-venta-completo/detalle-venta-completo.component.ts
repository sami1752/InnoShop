import {Component, OnInit} from '@angular/core';
import {VentasService} from '../../../../services/ventas.service';

@Component({
  selector: 'app-detalle-venta-completo',
  templateUrl: './detalle-venta-completo.component.html',
  styleUrls: ['./detalle-venta-completo.component.css']
})
export class DetalleVentaCompletoComponent implements OnInit {

  constructor(public ventasService: VentasService) {
  }

  ngOnInit(): void {
  }

}
