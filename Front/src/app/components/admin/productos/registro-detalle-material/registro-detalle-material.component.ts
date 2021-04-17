import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro-detalle-material',
  templateUrl: './registro-detalle-material.component.html',
  styleUrls: ['./registro-detalle-material.component.css']
})
export class RegistroDetalleMaterialComponent implements OnInit {

  constructor(public productoService: ProductoService, public usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.productoService.listarMateriales();
  }

  registrarDetalle(){
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.productoService.DetalleMaterial = this.productoService.formularioRegistroDetalleMaterial.value;
        this.productoService.DetalleMaterial.IdUsuario = (res as Usuario).Id;
        this.productoService.RegistrarDetalleMaterial().subscribe(
          (respuesta: any) => {
            this.productoService.ListarDetalleMaterial(this.productoService.DetalleMaterial.IdProducto);
            this.productoService.tablaDetalleMateriales=true;
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
