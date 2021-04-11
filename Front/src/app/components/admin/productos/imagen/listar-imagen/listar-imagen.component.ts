import { Component, OnInit } from '@angular/core';
import { Imagen } from 'src/app/models/imagen';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {

  constructor(public productoService:ProductoService) { }

  ngOnInit(): void {
  }

  eliminarImagen(imagen:Imagen){
    if (confirm("¿Estás seguro de eliminar la imagen?")) {
      this.productoService.EliminarImagen(imagen.IdImagen).subscribe(
        res=>{
          this.productoService.listarImagen(imagen.IdProducto);
        },
        err=>{
          console.log(err);
        }
      );
    }
  }

}
