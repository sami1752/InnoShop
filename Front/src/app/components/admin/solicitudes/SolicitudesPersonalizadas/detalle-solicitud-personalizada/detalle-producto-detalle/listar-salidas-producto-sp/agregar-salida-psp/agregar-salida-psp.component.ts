import {Component, OnInit} from '@angular/core';
import {ProductoService} from '../../../../../../../../services/producto.service';
import {UsuarioService} from '../../../../../../../../services/usuario.service';
import {ListarSalidasComponent} from '../../../../../../productos/salidas/listar-salidas/listar-salidas.component';
import {ToastrService} from 'ngx-toastr';
import {Usuario} from '../../../../../../../../models/usuario';
import {VentasService} from '../../../../../../../../services/ventas.service';
import {SolicitudesPersonalizadasService} from '../../../../../../../../services/solicitudes-personalizadas.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-agregar-salida-psp',
  templateUrl: './agregar-salida-psp.component.html',
  styleUrls: ['./agregar-salida-psp.component.css']
})
export class AgregarSalidaPSPComponent implements OnInit {

  constructor(public productoService: ProductoService,
              private rutaActiva: ActivatedRoute,
              public usuarioService: UsuarioService,
              public toast: ToastrService,
              public ventasSerive: VentasService,
              public solicitudesPersonalizadasService: SolicitudesPersonalizadasService) {
  }
  id: number = this.rutaActiva.snapshot.params.IdSolicitud;

  ngOnInit(): void {
  }

  registroSalida(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.productoService.salida = this.productoService.formularioRegistroSalida.value;
        this.productoService.salida.IdUsuario = (res as Usuario).Id;
        this.productoService.salida.IdProducto = this.productoService.detalleProducto.IdProducto;
        this.productoService.RegistroSalida().subscribe(
          (respuesta: any) => {
            this.toast.success('Se registró la salida exitosamente', 'Salidas producto');
            this.ventasSerive.ListarSalidasProducto(this.productoService.detalleProducto.IdProducto);
            this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id);
            this.productoService.buscarProductoIdDetalle(this.productoService.detalleProducto.IdProducto);
            this.productoService.formularioRegistroEntrada.reset();
            this.productoService.formularioSalida = false;
          }, error => {
            this.toast.error('Error de registro');
          });
      },
      err => {
        console.log(err);
      }
    );
  }

}
