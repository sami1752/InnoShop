import {Component, OnInit} from '@angular/core';
import {SolicitudesPersonalizadasService} from 'src/app/services/solicitudes-personalizadas.service';
import {UsuarioService} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listar-solicitudes-personalizadas',
  templateUrl: './listar-solicitudes-personalizadas.component.html',
  styleUrls: ['./listar-solicitudes-personalizadas.component.css']
})
export class ListarSolicitudesPersonalizadasComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.solicitudesPersonalizadasService.ListarSolicitudPersonalizada();

  }

}
