import { Component, OnInit } from '@angular/core';
import {SolicitudesPersonalizadasService} from '../../../../../../services/solicitudes-personalizadas.service';
import {ActivatedRoute} from '@angular/router';
import {ProductoService} from '../../../../../../services/producto.service';
import {UsuarioService} from '../../../../../../services/usuario.service';
import {Usuario} from '../../../../../../models/usuario';

@Component({
  selector: 'app-detalle-m',
  templateUrl: './detalle-m.component.html',
  styleUrls: ['./detalle-m.component.css']
})
export class DetalleMComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              private rutaActiva: ActivatedRoute,
              public productoService: ProductoService,
              public usuarioService: UsuarioService) {
  }
  id: number = this.rutaActiva.snapshot.params.IdMontaje;

  ngOnInit(): void {
    this.solicitudesPersonalizadasService.BuscarMontajes(
      this.id
    );
  }

  Aceptar(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoMontajes.value;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdEstado = 4;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdMontaje = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosMontajes().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarMontajes(this.id);
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
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoMontajes.value;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdEstado = 3;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdMontaje = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosMontajes().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarMontajes(this.id);
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
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoMontajes.value;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdEstado = 5;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdMontaje = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosMontajes().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarMontajes(this.id);
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
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoMontajes.value;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdEstado = 11;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdMontaje = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosMontajes().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarMontajes(this.id);
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
