import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SolicitudesPersonalizadasService} from '../../../../../../services/solicitudes-personalizadas.service';
import {ProductoService} from '../../../../../../services/producto.service';
import {Producto} from '../../../../../../models/producto';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {VentasService} from '../../../../../../services/ventas.service';

@Component({
  selector: 'app-listar-detalle-producto-m',
  templateUrl: './listar-detalle-producto-m.component.html',
  styleUrls: ['./listar-detalle-producto-m.component.css']
})
export class ListarDetalleProductoMComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute,
              public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              private router: Router,
              public productoService: ProductoService,
              public ventasService: VentasService) {
  }

  id: number = this.rutaActiva.snapshot.params.IdMontaje;

  ngOnInit(): void {
    this.solicitudesPersonalizadasService.ListaDetallesProductosMontajes(this.id);
  }

  llenarFormularioProducto(id: number): void {
    this.productoService.buscarProducto(id).subscribe(res => {
      this.productoService.producto = res as Producto;
      this.productoService.CampoPrecio = false;
      this.productoService.formularioRegistroProductos.patchValue(this.productoService.producto);
      this.productoService.desplegarDetalleMateriales = true;
      this.productoService.tablaDetalleMateriales = true;
      this.productoService.idProducto1 = this.productoService.producto.IdProducto;
      this.productoService.ListarDetalleMaterial(this.productoService.producto.IdProducto);
    });
  }


  eliminarProducto(id): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
    if (confirm('¿Estás seguro de eliminar el Producto?')) {
      this.solicitudesPersonalizadasService.EliminarDetallesProductosMontajes(id).subscribe(
        res => {
          alert('Exito');
        },
        err => {
          alert('Error');
        }
      );
    }
  }

  detalleProducto(id): void {
    this.productoService.buscarProductoIdDetalle(id);
    this.productoService.listarPrecios(id);
    this.productoService.listarImagen(id);
    this.productoService.ListarDetalleMaterial(id);
    this.productoService.listarEntradas(id);
    this.ventasService.ListarSalidasProducto(id);
  }

}
