import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SolicitudesPersonalizadasService} from '../../../../../../services/solicitudes-personalizadas.service';
import {ProductoService} from '../../../../../../services/producto.service';
import {Producto} from '../../../../../../models/producto';

@Component({
  selector: 'app-listar-detalle-producto-m',
  templateUrl: './listar-detalle-producto-m.component.html',
  styleUrls: ['./listar-detalle-producto-m.component.css']
})
export class ListarDetalleProductoMComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute,
              public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              private router: Router, public productoService: ProductoService) {
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
    alert(id);
    this.productoService.listarImagen(id);
    this.productoService.ListarDetalleMaterial(id);
    this.productoService.listarEntradas(id);
  }

}
