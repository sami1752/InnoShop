import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { SolicitudesPersonalizadasService } from 'src/app/services/solicitudes-personalizadas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-solicitud-personalizada',
  templateUrl: './registrar-solicitud-personalizada.component.html',
  styleUrls: ['./registrar-solicitud-personalizada.component.css']
})
export class RegistrarSolicitudPErsonalizadaComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService, public usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  registrar(){
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.SolicitudPersonalizada =
        this.solicitudesPersonalizadasService.formularioRegistroSolicitudPersonalizada.value;
        this.solicitudesPersonalizadasService.SolicitudPersonalizada.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.AgregarSolicitudPersonalizada().subscribe(
          (respuesta: any) => {
            this.solicitudesPersonalizadasService.formularioRegistroSolicitudPersonalizada.reset();
            alert("Exito")
          }, error => {
            alert(error)
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }

}
