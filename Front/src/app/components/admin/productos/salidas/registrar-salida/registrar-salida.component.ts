import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../../../../services/producto.service';
import {Usuario} from '../../../../../models/usuario';
import {UsuarioService} from '../../../../../services/usuario.service';
import {ListarSalidasComponent} from '../listar-salidas/listar-salidas.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registrar-salida',
  templateUrl: './registrar-salida.component.html',
  styleUrls: ['./registrar-salida.component.css']
})
export class RegistrarSalidaComponent implements OnInit {

  constructor(public productoService: ProductoService,
              public usuarioService: UsuarioService,
              public listaSalidas: ListarSalidasComponent,
              public toast: ToastrService) { }

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
            this.toast.success('Registro exitoso');
            this.listaSalidas.listarSalidas(this.productoService.detalleProducto.IdProducto);
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
