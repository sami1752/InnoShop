import {Component, NgModule, OnInit} from '@angular/core';
import {Imagen} from 'src/app/models/imagen';
import {ProductoService} from 'src/app/services/producto.service';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {OwlModule} from 'ngx-owl-carousel';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {

  constructor(public productoService: ProductoService) {
  }

  homeSlider = {items: 1, dots: true, nav: true};
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
  };

  ngOnInit(): void {
  }

  eliminarImagen(imagen: Imagen): void {

    Swal.fire({
      title: '¿Está seguro de eliminar la imagen del producto?',
      text: 'Se eliminará la imagen del producto',
      textClass: 'center',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.EliminarImagen(imagen.IdImagen).subscribe(
          res => {
            Swal.fire(
              'Eliminación de imagen',
              'Se ha eliminado con éxito',
              'success'
            );
            this.productoService.listarImagen(imagen.IdProducto);
          },
          err => {
            alert('Ha ocurrido un error');
          }
        );
      }
    });
  }
}
