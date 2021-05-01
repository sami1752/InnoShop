import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { SolicitudesPersonalizadasService } from 'src/app/services/solicitudes-personalizadas.service';

@Component({
  selector: 'app-listar-detalle-producto-solicitud',
  templateUrl: './listar-detalle-producto-solicitud.component.html',
  styleUrls: ['./listar-detalle-producto-solicitud.component.css']
})
export class ListarDetalleProductoSolicitudComponent implements OnInit {

  constructor( private rutaActiva: ActivatedRoute, public solicitudesPersonalizadasService :SolicitudesPersonalizadasService, private router:Router, public productoService:ProductoService) { }
  id:number = this.rutaActiva.snapshot.params.IdSolicitud;
  ngOnInit(): void {
    this.solicitudesPersonalizadasService.ListaDetalleProductosSolicitud(this.id);
  }

  llenarFormularioDertalleProducto(producto:Producto){
    this.productoService.CampoPrecio = false
    this.productoService.formularioRegistroProductos.patchValue(producto);
    this.productoService.desplegarDetalleMateriales =true;
    this.productoService.tablaDetalleMateriales =true;
    this.productoService.idProducto1 = producto.IdProducto;
    this.productoService.ListarDetalleMaterial(producto.IdProducto);
  }
  eliminarProducto(producto:Producto){
    if (confirm("¿Estás seguro de desactivar el Producto?")) {
      this.solicitudesPersonalizadasService.EliminarDetalleProductosSolicitud(producto.IdProducto).subscribe(
        res=>{
          this.productoService.listarProducto();
          alert(res);
        },
        err=>{
          alert(err.code);
        }
      );
    }
  }
  detalleProducto(id){
    this.productoService.buscarProductoIdDetalle(id);
    this.productoService.listarPrecios(id);
    alert(id)
    this.productoService.listarImagen(id);
    this.productoService.ListarDetalleMaterial(id);
  }

  tomarIdProducto(id){
    this.productoService.precio.IdProducto = id
  }

}
