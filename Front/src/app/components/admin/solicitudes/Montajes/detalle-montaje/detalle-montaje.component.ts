import { Component, OnInit } from '@angular/core';
import {SolicitudesPersonalizadasService} from '../../../../../services/solicitudes-personalizadas.service';
import {UsuarioService} from '../../../../../services/usuario.service';
import {ActivatedRoute} from '@angular/router';
import {ProductoService} from '../../../../../services/producto.service';
import {Usuario} from '../../../../../models/usuario';

@Component({
  selector: 'app-detalle-montaje',
  templateUrl: './detalle-montaje.component.html',
  styleUrls: ['./detalle-montaje.component.css']
})
export class DetalleMontajeComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public usuarioService: UsuarioService, private rutaActiva: ActivatedRoute,
              public productoService: ProductoService) {
  }

  id: number = this.rutaActiva.snapshot.params.IdMontaje;

  ngOnInit(): void {
    this.solicitudesPersonalizadasService.BuscarMontajes(this.id);
  }

  cancelar(): void {
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

  cotizar(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoMontajes.value;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdEstado = 10;
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
  TerminarCotizacion(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoMontajes.value;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdEstado = 2;
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
