import {Component, OnInit} from '@angular/core';
import {Usuario} from 'src/app/models/usuario';
import {ProductoService} from 'src/app/services/producto.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registro-detalle-material',
  templateUrl: './registro-detalle-material.component.html',
  styleUrls: ['./registro-detalle-material.component.css']
})
export class RegistroDetalleMaterialComponent implements OnInit {

  constructor(public productoService: ProductoService,
              public usuarioService: UsuarioService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.productoService.listarMateriales();
  }

  registrarDetalle(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.productoService.DetalleMaterial = this.productoService.formularioRegistroDetalleMaterial.value;
        this.productoService.DetalleMaterial.IdUsuario = (res as Usuario).Id;
        this.productoService.RegistrarDetalleMaterial().subscribe(
          (respuesta: any) => {
            this.toastr.success('Registro exitoso');
            window.location.reload();
          }, error => {
            this.toastr.error('Ha ocurrido un error');
          });
      },
      err => {
        console.log(err);
      }
    );
  }

}
