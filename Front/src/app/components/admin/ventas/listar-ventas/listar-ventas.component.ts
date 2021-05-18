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

}
