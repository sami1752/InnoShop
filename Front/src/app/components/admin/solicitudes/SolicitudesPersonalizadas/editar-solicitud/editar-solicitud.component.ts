import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SolicitudesPersonalizadasService} from '../../../../../services/solicitudes-personalizadas.service';
import {UsuarioService} from '../../../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent implements OnInit {

  constructor(public router: Router,
              public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public usuarioService: UsuarioService,
              private rutaActiva: ActivatedRoute,
              private toastr: ToastrService) {
  }

  id: number = this.rutaActiva.snapshot.params.IdSolicitud;

  ngOnInit(): void {
    this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id);
  }

  actualizacion(): void {
    this.solicitudesPersonalizadasService.SolicitudPersonalizada =
      this.solicitudesPersonalizadasService.formularioRegistroSolicitudPersonalizada.value;
    this.solicitudesPersonalizadasService
      .EditarSolicitudPersonalizada()
      .subscribe(
        (respuesta: any) => {
          this.router.navigate(['Admin/detalleSP/',
            this.solicitudesPersonalizadasService.SolicitudPersonalizada.IdSolicitudPersonalizada]);
          this.toastr.success('Edición  exitosa');
        },
        (error) => {
          this.toastr.success('Edición  exitosa');
          console.log(error);
        }
      );
  }

}
