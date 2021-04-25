import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { SolicitudesPersonalizadasService } from 'src/app/services/solicitudes-personalizadas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-solicitud-personalizada',
  templateUrl: './registrar-solicitud-personalizada.component.html',
  styleUrls: ['./registrar-solicitud-personalizada.component.css'],
})
export class RegistrarSolicitudPErsonalizadaComponent implements OnInit {
  constructor(
    public router: Router,
    public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
    public usuarioService: UsuarioService,
    private rutaActiva: ActivatedRoute
  ) {}
  id: number = this.rutaActiva.snapshot.params.IdSolicitud;
  ngOnInit(): void {
    if (this.id != 0) {
      this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(
        this.id
      );
    }
  }

  registrar() {
    this.usuarioService.obtenerPerfil().subscribe(
      (res) => {
        this.solicitudesPersonalizadasService.SolicitudPersonalizada = this.solicitudesPersonalizadasService.formularioRegistroSolicitudPersonalizada.value;
        this.solicitudesPersonalizadasService.SolicitudPersonalizada.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService
          .AgregarSolicitudPersonalizada()
          .subscribe(
            (respuesta: any) => {
              this.router.navigate(['solicitudes/MisSolicitudes']);
              alert('Exito');
            },
            (error) => {
              alert(error);
              console.log(error);
            }
          );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  actualizacion() {
    this.solicitudesPersonalizadasService
      .EditarSolicitudPersonalizada()
      .subscribe(
        (respuesta: any) => {
          this.router.navigate(['solicitudes/MisSolicitudes']);
          alert('Actualizacion Exitosa');
        },
        (error) => {
          alert(error);
          console.log(error);
        }
      );
  }

  onSubmit() {
    this.solicitudesPersonalizadasService.SolicitudPersonalizada = this.solicitudesPersonalizadasService.formularioRegistroSolicitudPersonalizada.value;
    if (
      this.solicitudesPersonalizadasService.SolicitudPersonalizada
        .IdSolicitudPersonalizada == null ||
      this.solicitudesPersonalizadasService.SolicitudPersonalizada
        .IdSolicitudPersonalizada == 0
    ) {
      alert('R');
      this.registrar();
    } else {
      alert('A');
      this.actualizacion();
    }
  }
}
