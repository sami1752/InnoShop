import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Usuario} from 'src/app/models/usuario';
import {ConfiguracionService} from 'src/app/services/configuracion.service';
import {ProductoService} from 'src/app/services/producto.service';
import {UsuarioService} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-precio',
  templateUrl: './registrar-precio.component.html',
  styleUrls: ['./registrar-precio.component.css']
})
export class RegistrarPrecioComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private router: Router,
              public productoService: ProductoService, public configuracion: ConfiguracionService) {
  }

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
            alert(respuesta.mensaje);
            console.log(respuesta.mensaje);
            this.productoService.formularioRegistroPrecio.reset();
            this.productoService.FormularioPrecio = false;
            this.productoService.listarPrecios(this.productoService.precio.IdProducto);
            this.productoService.buscarProductoIdDetalle(this.productoService.precio.IdProducto);
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
