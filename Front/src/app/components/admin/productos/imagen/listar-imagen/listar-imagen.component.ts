import { Component, NgModule, OnInit } from '@angular/core';
import { Imagen } from 'src/app/models/imagen';
import { ProductoService } from 'src/app/services/producto.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import{OwlModule} from 'ngx-owl-carousel';

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
  homeSlider={items: 1, dots:true, nav: true};
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

}
