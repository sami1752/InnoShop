import {Component, OnInit} from '@angular/core';
import {Usuario} from 'src/app/models/usuario';
import {ProductoService} from 'src/app/services/producto.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-agregar-material',
  templateUrl: './agregar-material.component.html',
  styleUrls: ['./agregar-material.component.css']
})
export class AgregarMaterialComponent implements OnInit {

  constructor(public productoService: ProductoService,
              public usuarioService: UsuarioService,
              public toastr: ToastrService) {
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
            this.toastr.success('Se registró el material exitosamente', 'Registro material');
            this.productoService.ListarDetalleMaterial(this.productoService.DetalleMaterial.IdProducto);
            this.productoService.tablaDetalleMateriales = true;
          }, error => {
            this.toastr.error('Ha ocurrido un error');
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }

}
