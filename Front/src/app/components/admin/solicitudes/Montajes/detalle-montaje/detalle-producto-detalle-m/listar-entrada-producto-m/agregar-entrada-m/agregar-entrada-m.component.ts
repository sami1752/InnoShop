import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../../../../../../../services/producto.service';
import {UsuarioService} from '../../../../../../../../services/usuario.service';
import {ActivatedRoute} from '@angular/router';
import {SolicitudesPersonalizadasService} from '../../../../../../../../services/solicitudes-personalizadas.service';
import {Usuario} from '../../../../../../../../models/usuario';

@Component({
  selector: 'app-agregar-entrada-m',
  templateUrl: './agregar-entrada-m.component.html',
  styleUrls: ['./agregar-entrada-m.component.css']
})
export class AgregarEntradaMComponent implements OnInit {

  constructor(public productoService: ProductoService, public usuarioService: UsuarioService,
              private rutaActiva: ActivatedRoute,
              public solicitudesPersonalizadasService: SolicitudesPersonalizadasService) {
  }
  id: number = this.rutaActiva.snapshot.params.IdSolicitud;

  ngOnInit(): void {
  }

  registroEntrada(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.productoService.entrada = this.productoService.formularioRegistroEntrada.value;
        this.productoService.entrada.IdUsuario = (res as Usuario).Id;
        this.productoService.entrada.IdProducto = this.productoService.detalleProducto.IdProducto;

        this.productoService.RegistroEntrada().subscribe(
          (respuesta: any) => {
            alert(respuesta.mensaje);
            this.productoService.formularioRegistroEntrada.reset();
            this.productoService.formularioEntrada = false;
            this.productoService.listarEntradas(this.productoService.entrada.IdProducto);
            this.productoService.buscarProductoIdDetalle(this.productoService.entrada.IdProducto);
            this.solicitudesPersonalizadasService.BuscarMontajes(this.id);
          }, error => {
            alert('error');
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }

}
