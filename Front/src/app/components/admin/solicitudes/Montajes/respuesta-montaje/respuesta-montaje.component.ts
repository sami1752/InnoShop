import {Component, OnInit} from '@angular/core';
import {SolicitudesPersonalizadasService} from '../../../../../services/solicitudes-personalizadas.service';
import {UsuarioService} from '../../../../../services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductoService} from '../../../../../services/producto.service';
import {ConfiguracionService} from '../../../../../services/configuracion.service';
import {Usuario} from '../../../../../models/usuario';
import {interval} from 'rxjs';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-respuesta-montaje',
  templateUrl: './respuesta-montaje.component.html',
  styleUrls: ['./respuesta-montaje.component.css']
})
export class RespuestaMontajeComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public usuarioService: UsuarioService,
              private router: Router,
              public productoService: ProductoService,
              public configuracion: ConfiguracionService,
              private rutaActiva: ActivatedRoute) {
  }

  id: number = this.rutaActiva.snapshot.params.IdMontaje;

  ngOnInit(): void {
    this.solicitudesPersonalizadasService.ListaRespuestasMontajes(this.id);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  // ngAfterViewInit(): void {
  //   setInterval('this.solicitudesPersonalizadasService.ListaRespuestasMontajes(this.id)',
  //     1000);
  // }

  resgistrarRespuesta(): void {
    console.log(this.solicitudesPersonalizadasService.formularioRegistroRespuestaM.value);
    this.usuarioService.obtenerPerfil().subscribe(
      (res) => {
        this.solicitudesPersonalizadasService.RespuestasMontajes =
          this.solicitudesPersonalizadasService.formularioRegistroRespuestaM.value;
        this.solicitudesPersonalizadasService.RespuestasMontajes.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.RespuestasMontajes.IdMontaje = this.id;
        this.solicitudesPersonalizadasService.AgregarRespuestasMontajes().subscribe(
          (respuesta: any) => {
            this.solicitudesPersonalizadasService.ListaRespuestasMontajes(this.id);
            this.solicitudesPersonalizadasService.formularioRegistroRespuestaM.reset();
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
