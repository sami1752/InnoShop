import {Component, OnInit} from '@angular/core';
import {SolicitudesPersonalizadasService} from '../../../../../services/solicitudes-personalizadas.service';
import {UsuarioService} from '../../../../../services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductoService} from '../../../../../services/producto.service';
import {ConfiguracionService} from '../../../../../services/configuracion.service';
import {Usuario} from '../../../../../models/usuario';

@Component({
  selector: 'app-respuestas-solicitud',
  templateUrl: './respuestas-solicitud.component.html',
  styleUrls: ['./respuestas-solicitud.component.css']
})
export class RespuestasSolicitudComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public usuarioService: UsuarioService,
              private router: Router,
              public productoService: ProductoService,
              public configuracion: ConfiguracionService,
              private rutaActiva: ActivatedRoute) {
  }

  id: number = this.rutaActiva.snapshot.params.IdSolicitud;
idUsuario="";
  ngOnInit(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      (res) =>{
        this.idUsuario=(res as Usuario).Id;
      })
    this.solicitudesPersonalizadasService.ListaRespuestasSolicitudesPersonalizadas(this.id);
   
  }

  resgistrarRespuesta(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      (res) => {
        this.solicitudesPersonalizadasService.RespuestasSolicitudesPersonalizadas =
          this.solicitudesPersonalizadasService.formularioRegistroRespuesta.value;
        this.solicitudesPersonalizadasService.RespuestasSolicitudesPersonalizadas.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.RespuestasSolicitudesPersonalizadas.IdSolicitudPersonalizada = this.id;
        this.solicitudesPersonalizadasService.AgregarRespuestasSolicitudesPersonalizadas().subscribe(
          (respuesta: any) => {
            this.solicitudesPersonalizadasService.ListaRespuestasSolicitudesPersonalizadas(this.id);
            this.solicitudesPersonalizadasService.formularioRegistroRespuesta.reset();
          },
          (error) => {
            alert(error);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
