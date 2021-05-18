import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Usuario} from 'src/app/models/usuario';
import {ConfiguracionService} from 'src/app/services/configuracion.service';
import {ProductoService} from 'src/app/services/producto.service';
import {UsuarioService} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-iva',
  templateUrl: './registrar-iva.component.html',
  styleUrls: ['./registrar-iva.component.css']
})
export class RegistrarIvaComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private router: Router,
              public productoService: ProductoService, public configuracion: ConfiguracionService) {
  }

  ngOnInit(): void {
  }

  registro(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.productoService.iva = this.productoService.formularioRegistroIVA.value;
        this.productoService.iva.IdUsuario = (res as Usuario).Id;
        this.productoService.registrarIVA().subscribe(
          (respuesta: any) => {
            alert(respuesta.mensaje);
            console.log(respuesta.mensaje);
            this.productoService.formularioRegistroIVA.reset();
            this.productoService.listarIva();
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
