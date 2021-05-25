import {ThisReceiver} from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import {DetalleVentasProducto} from 'src/app/models/Ventas/detalle-ventas-producto';
import {Venta} from 'src/app/models/Ventas/venta';
import {ProductoService} from 'src/app/services/producto.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {VentasService} from 'src/app/services/ventas.service';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.css']
})
export class RegistrarVentaComponent implements OnInit {

  constructor(public ventasService: VentasService, public productosService: ProductoService, public usuarioService: UsuarioService) {
  }
  detalleVentaProducto: DetalleVentasProducto;
  camposDetalle = false;

  ngOnInit(): void {
    this.productosService.listarProducto();
  }



  llenarCamposVenta(idProducto: number): any {
    this.ventasService.desplegarDetalle = false;
    if (idProducto > 0) {
      this.usuarioService.obtenerPerfil().subscribe((res: any) => this.ventasService.venta.IdUsuario = res.Id);
      this.camposDetalle = true;
      this.productosService.buscarProductoIdDetalle(idProducto);
    } else {
      this.camposDetalle = false;
    }

  }

  finalizarVenta(): any {
    this.ventasService.formularioRegistroVenta.reset();
    this.camposDetalle = false;
    this.ventasService.desplegarDetalleVentaEnRegistro = false;
    this.ventasService.ListarVentas();
    alert('Venta Finalizada con exito');
  }


  agregarDetalleProducto(): any {
    this.ventasService.desplegarDetalle = false;
    if (this.ventasService.IdVenta > 0) {
      this.detalleVentaProducto = this.ventasService.formularioRegistroVenta.value;
      this.detalleVentaProducto.IdDetalleVentaProducto = 0;
      this.detalleVentaProducto.IdVenta = this.ventasService.IdVenta;
      this.detalleVentaProducto.SubTotal = this.detalleVentaProducto.Cantidad * this.productosService.detalleProducto.Precio;
      this.ventasService.agregarDetalleVenta(this.detalleVentaProducto).subscribe(
        (res: any) => {
          alert(res.mensaje);
          this.ventasService.desplegarDetalleVentaEnRegistro = true;
          this.ventasService.ListarDetalleVentasProductos(this.ventasService.IdVenta);
          this.ventasService.DetalleVenta(this.ventasService.IdVenta);
          this.camposDetalle = false;
        });
    } else {
      this.ventasService.AgregarVenta().subscribe(
        (resp: Venta) => {
          this.ventasService.formularioRegistroVenta.patchValue(resp);
          this.detalleVentaProducto = this.ventasService.formularioRegistroVenta.value;
          this.detalleVentaProducto.IdDetalleVentaProducto = 0;
          this.detalleVentaProducto.IdVenta = resp.IdVenta;
          this.detalleVentaProducto.SubTotal = this.detalleVentaProducto.Cantidad * this.productosService.detalleProducto.Precio;
          this.ventasService.agregarDetalleVenta(this.detalleVentaProducto).subscribe(
            (res: any) => {
              alert(res.mensaje);
              this.camposDetalle = false;
              this.ventasService.desplegarDetalleVentaEnRegistro = true;
              this.ventasService.ListarDetalleVentasProductos(resp.IdVenta);
              this.ventasService.DetalleVenta(this.ventasService.IdVenta);
            }, err => {
              alert('Error');
            }
          );
        }
      );
    }


  }

}
