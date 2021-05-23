import {Component, OnInit} from '@angular/core';
import {VentasService} from 'src/app/services/ventas.service';

@Component({
  selector: 'app-gestion-ventas',
  templateUrl: './gestion-ventas.component.html',
  styleUrls: ['./gestion-ventas.component.css']
})
export class GestionVentasComponent implements OnInit {

  constructor(public ventasService: VentasService) {
  }

  ngOnInit(): void {
  }

}
