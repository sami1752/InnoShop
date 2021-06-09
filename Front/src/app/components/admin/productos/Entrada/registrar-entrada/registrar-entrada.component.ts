import {Component, OnInit} from '@angular/core';
import {Usuario} from 'src/app/models/usuario';
import {ProductoService} from 'src/app/services/producto.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import {ListarEntradasComponent} from '../listar-entradas/listar-entradas.component';
@Component({
  selector: 'app-registrar-entrada',
  templateUrl: './registrar-entrada.component.html',
  styleUrls: ['./registrar-entrada.component.css']
})
export class RegistrarEntradaComponent implements OnInit {

  constructor(public productoService: ProductoService,
              public usuarioService: UsuarioService,
              private toastr: ToastrService,
              public listaEntradas: ListarEntradasComponent) {
  }

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
            this.toastr.success('Se registró la entrada  exitosamente', 'Registro entrada');
            this.listaEntradas.listarEntradas(this.productoService.detalleProducto.IdProducto);
            this.productoService.formularioRegistroEntrada.reset();
            this.productoService.formularioEntrada = false;
            this.productoService.listarEntradas(this.productoService.entrada.IdProducto);
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
