import { Component, OnInit } from '@angular/core';
import {VentasService} from '../../../../../services/ventas.service';

@Component({
  selector: 'app-gestion-compras',
  templateUrl: './gestion-compras.component.html',
  styleUrls: ['./gestion-compras.component.css']
})
export class GestionComprasComponent implements OnInit {

  constructor(public ventasService: VentasService) { }

  ngOnInit(): void {
  }

}
