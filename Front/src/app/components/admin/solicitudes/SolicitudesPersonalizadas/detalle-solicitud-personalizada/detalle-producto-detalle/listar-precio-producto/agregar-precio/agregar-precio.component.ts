import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from 'src/app/models/usuario';
import {ConfiguracionService} from 'src/app/services/configuracion.service';
import {ProductoService} from 'src/app/services/producto.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {SolicitudesPersonalizadasService} from '../../../../../../../../services/solicitudes-personalizadas.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-agregar-precio',
  templateUrl: './agregar-precio.component.html',
  styleUrls: ['./agregar-precio.component.css']
})
export class AgregarPrecioComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private router: Router,
              public productoService: ProductoService, public configuracion: ConfiguracionService,
              private rutaActiva: ActivatedRoute,
              public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public toastr: ToastrService) {
  }

  id: number = this.rutaActiva.snapshot.params.IdSolicitud;
  ngOnInit(): void {
    this.productoService.formularioRegistroPrecio.patchValue(this.productoService.precio);
  }

  registro(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.productoService.precio = this.productoService.formularioRegistroPrecio.value;
        this.productoService.precio.IdUsuario = (res as Usuario).Id;
        this.productoService.registroPrecio().subscribe(
          (respuesta: any) => {
            this.toastr.success('Se registró el precio exitosamente', 'Registro precio');
            this.productoService.formularioRegistroPrecio.reset();
            this.productoService.FormularioPrecio = false;
            this.productoService.listarPrecios(this.productoService.precio.IdProducto);
            this.productoService.buscarProductoIdDetalle(this.productoService.precio.IdProducto);
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
