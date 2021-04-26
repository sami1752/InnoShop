import { Component, OnInit } from '@angular/core';
import { DescuentosService } from 'src/app/services/descuentos.service';

@Component({
  selector: 'app-listar-porcentajes',
  templateUrl: './listar-porcentajes.component.html',
  styleUrls: ['./listar-porcentajes.component.css']
})
export class ListarPorcentajesComponent implements OnInit {

  constructor(public descuentosService:DescuentosService) { }

  ngOnInit(): void {
    this.descuentosService.ListarPorcentajeDescuentos()
  }

}
