import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(public configuracionService:ConfiguracionService) { }

  ngOnInit(): void {
  }

}
