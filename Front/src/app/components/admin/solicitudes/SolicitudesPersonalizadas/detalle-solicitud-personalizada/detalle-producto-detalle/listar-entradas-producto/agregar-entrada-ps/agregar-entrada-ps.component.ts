import {Component, OnInit} from '@angular/core';
import {Usuario} from 'src/app/models/usuario';
import {ProductoService} from 'src/app/services/producto.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {ActivatedRoute} from '@angular/router';
import {SolicitudesPersonalizadasService} from '../../../../../../../../services/solicitudes-personalizadas.service';

@Component({
  selector: 'app-agregar-entrada-ps',
  templateUrl: './agregar-entrada-ps.component.html',
  styleUrls: ['./agregar-entrada-ps.component.css']
})
export class AgregarEntradaPSComponent implements OnInit {

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
            this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id);
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
