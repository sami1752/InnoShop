import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Producto} from 'src/app/models/producto';
import {DetalleProductosSolicitud} from 'src/app/models/SolicitudesPersonalizadas/detalle-productos-solicitud';
import {ProductoService} from 'src/app/services/producto.service';
import {SolicitudesPersonalizadasService} from 'src/app/services/solicitudes-personalizadas.service';

@Component({
  selector: 'app-listar-detalle-producto',
  templateUrl: './listar-detalle-producto.component.html',
  styleUrls: ['./listar-detalle-producto.component.css']
})
export class ListarDetalleProductoComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute,
              public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              private router: Router, public productoService: ProductoService) {
  }

  id: number = this.rutaActiva.snapshot.params.IdSolicitud;

  ngOnInit(): void {
    this.solicitudesPersonalizadasService.ListaDetalleProductosSolicitud(this.id);
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
      this.solicitudesPersonalizadasService.EliminarDetalleProductosSolicitud(id).subscribe(
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
  }

  tomarIdProducto(id): void {
    this.productoService.precio.IdProducto = id;
  }

}
