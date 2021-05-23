import {Component, OnInit} from '@angular/core';
import {VentasService} from 'src/app/services/ventas.service';

@Component({
  selector: 'app-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.css']
})
export class ListarVentasComponent implements OnInit {

  constructor(public ventasService: VentasService) {
  }

  ngOnInit(): void {
    this.ventasService.ListarVentas();
  }

  detalleVenta(idVenta: number): any {
    this.ventasService.ListarDetalleVentasProductos(idVenta);
    this.ventasService.DetalleVenta(idVenta);
    this.ventasService.desplegarDetalleVentaEnRegistro = !this.ventasService.desplegarDetalleVentaEnRegistro;
  }

}
