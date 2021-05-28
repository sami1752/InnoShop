import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../../../../services/producto.service';
import {Usuario} from '../../../../../models/usuario';
import {UsuarioService} from '../../../../../services/usuario.service';

@Component({
  selector: 'app-registrar-salida',
  templateUrl: './registrar-salida.component.html',
  styleUrls: ['./registrar-salida.component.css']
})
export class RegistrarSalidaComponent implements OnInit {

  constructor(public productoService: ProductoService,
              public usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  registroSalida(): void{
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.productoService.salida = this.productoService.formularioRegistroSalida.value;
        this.productoService.salida.IdUsuario = (res as Usuario).Id;
        this.productoService.salida.IdProducto = this.productoService.detalleProducto.IdProducto;
        this.productoService.RegistroSalida().subscribe(
          (respuesta: any) => {
            alert(respuesta.mensaje);
            this.productoService.formularioRegistroEntrada.reset();
            this.productoService.formularioSalida = false;
            window.location.reload();
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
