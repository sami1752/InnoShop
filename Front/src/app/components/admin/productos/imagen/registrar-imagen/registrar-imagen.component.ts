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

@Component({
  selector: 'app-registrar-imagen',
  templateUrl: './registrar-imagen.component.html',
  styleUrls: ['./registrar-imagen.component.css']
})
export class RegistrarImagenComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private router: Router, public productoService: ProductoService, public configuracion: ConfiguracionService) {}

  ngOnInit(): void {
    this.productoService.formularioRegistroImagen.patchValue(this.productoService.imagen);
  }

  registro() {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.productoService.imagen = this.productoService.formularioRegistroImagen.value;
        this.productoService.imagen.IdUsuario = (res as Usuario).Id;
        this.productoService.registroImagen().subscribe(
          (respuesta: any) => {
            alert(respuesta.mensaje)
            console.log(respuesta.mensaje);
            this.productoService.formularioRegistroImagen.reset();
            this.productoService.FormularioImagen = false
            this.productoService.listarImagen(this.productoService.imagen.IdProducto);
          }, error => {
            alert(error)
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }
 
}