import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  Usuario
} from 'src/app/models/usuario';
import {
  ConfiguracionService
} from 'src/app/services/configuracion.service';
import {
  ProductoService
} from 'src/app/services/producto.service';
import {
  UsuarioService
} from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registrar-imagen',
  templateUrl: './registrar-imagen.component.html',
  styleUrls: ['./registrar-imagen.component.css']
})
export class RegistrarImagenComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private router: Router,
              public productoService: ProductoService,
              public configuracion: ConfiguracionService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.productoService.formularioRegistroImagen.patchValue(this.productoService.imagen);
  }

  registro(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.productoService.imagen = this.productoService.formularioRegistroImagen.value;
        this.productoService.imagen.IdUsuario = (res as Usuario).Id;
        this.productoService.registroImagen().subscribe(
          (respuesta: any) => {
            this.toastr.success('Se registró la imagen  exitosamente', 'Registro imagen');
            this.productoService.formularioRegistroImagen.reset();
            this.productoService.FormularioImagen = false;
            this.productoService.listarImagen(this.productoService.imagen.IdProducto);
          }, error => {
            this.toastr.error('Ha ocurrido un error');
          });
      },
      err => {
        this.toastr.error('Ha ocurrido un error al buscar usuario');
      }
    );
  }
}
