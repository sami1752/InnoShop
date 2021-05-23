import { Component, OnInit } from '@angular/core';
import {SolicitudesPersonalizadasService} from '../../../../../services/solicitudes-personalizadas.service';
import {UsuarioService} from '../../../../../services/usuario.service';

@Component({
  selector: 'app-listar-montaje',
  templateUrl: './listar-montaje.component.html',
  styleUrls: ['./listar-montaje.component.css']
})
export class ListarMontajeComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.solicitudesPersonalizadasService.ListarMontajes();

  }

}
