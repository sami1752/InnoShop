import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudesPersonalizadasService } from 'src/app/services/solicitudes-personalizadas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle-solicitud-personalizada',
  templateUrl: './detalle-solicitud-personalizada.component.html',
  styleUrls: ['./detalle-solicitud-personalizada.component.css']
})
export class DetalleSolicitudPersonalizadaComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService :SolicitudesPersonalizadasService, 
    public usuarioService : UsuarioService, private rutaActiva: ActivatedRoute) { }
    id:number = this.rutaActiva.snapshot.params.IdSolicitud;
  ngOnInit(): void {
    this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id)
  }

}
