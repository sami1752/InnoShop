import { Component, OnInit } from '@angular/core';
import { DescuentosService } from 'src/app/services/descuentos.service';

@Component({
  selector: 'app-listar-valor-ruleta',
  templateUrl: './listar-valor-ruleta.component.html',
  styleUrls: ['./listar-valor-ruleta.component.css']
})
export class ListarValorRuletaComponent implements OnInit {

  constructor(public descuentosService:DescuentosService) { }

  ngOnInit(): void {
    this.descuentosService.listarValoresRuleta()
  }

}
