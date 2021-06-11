import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SolicitudesPersonalizadasService} from '../../../../../../../services/solicitudes-personalizadas.service';
import {ProductoService} from '../../../../../../../services/producto.service';
import {Producto} from '../../../../../../../models/producto';

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

  detalleProducto(id): void {
    this.productoService.buscarProductoIdDetalle(id);
    this.productoService.listarPrecios(id);
    this.productoService.listarImagen(id);
    this.productoService.ListarDetalleMaterial(id);
    this.productoService.listarEntradas(id);
  }
}
