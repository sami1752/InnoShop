import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SolicitudesPersonalizadasService} from '../../../../../../services/solicitudes-personalizadas.service';
import {ProductoService} from '../../../../../../services/producto.service';
import {Usuario} from '../../../../../../models/usuario';
import {UsuarioService} from '../../../../../../services/usuario.service';

@Component({
  selector: 'app-detalle-sp',
  templateUrl: './detalle-sp.component.html',
  styleUrls: ['./detalle-sp.component.css']
})
export class DetalleSPComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              private rutaActiva: ActivatedRoute,
              public productoService: ProductoService,
              public usuarioService: UsuarioService) {
  }
  id: number = this.rutaActiva.snapshot.params.IdSolicitud;

  ngOnInit(): void {
    this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(
      this.id
    );
  }

  Aceptar(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoSolicitudPerzonalizada.value;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdEstado = 4;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdSolicitudPersonalizada = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosSolicitudPersonalizada().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id);
          }, error => {
            alert(error);
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }

  Rechazar(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoSolicitudPerzonalizada.value;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdEstado = 5;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdSolicitudPersonalizada = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosSolicitudPersonalizada().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id);
          }, error => {
            alert(error);
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }

  Cancelar(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoSolicitudPerzonalizada.value;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdEstado = 11;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdSolicitudPersonalizada = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosSolicitudPersonalizada().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id);
          }, error => {
            alert(error);
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }

  Devoler(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoSolicitudPerzonalizada.value;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdEstado = 3;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdSolicitudPersonalizada = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosSolicitudPersonalizada().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id);
          }, error => {
            alert(error);
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }
}
