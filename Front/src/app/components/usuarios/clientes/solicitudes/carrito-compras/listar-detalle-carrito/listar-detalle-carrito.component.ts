import {Component, OnInit} from '@angular/core';
import {DetalleCarritoDeCompras} from 'src/app/models/detalle-carrito-de-compras';
import {PerfilUsuario} from 'src/app/models/perfil-usuario';
import {Usuario} from 'src/app/models/usuario';
import {CarritoDeComprasService} from 'src/app/services/carrito-de-compras.service';
import {ProductoService} from 'src/app/services/producto.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {VentasService} from 'src/app/services/ventas.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-listar-detalle-carrito',
  templateUrl: './listar-detalle-carrito.component.html',
  styleUrls: ['./listar-detalle-carrito.component.css']
})
export class ListarDetalleCarritoComponent implements OnInit {

  constructor(public carritoDeComprasService: CarritoDeComprasService,
              public productoService: ProductoService,
              public usuarioService: UsuarioService,
              public ventasService: VentasService,
              public toastr: ToastrService
  ) {
  }

  perfilUsuario;

  ngOnInit(): void {
    this.productoService.listarTodosPrecios();
    this.usuarioService.obtenerPerfil().subscribe(
      (res: any) => {
        this.perfilUsuario = res;
        this.carritoDeComprasService.CarritoDeComprasUsuario(res.Id);
        this.carritoDeComprasService.listarDetalleCarrito(res.Id);
        this.ventasService.ObtenerIvaActual();
      },
      err => {
      }
    );
  }

  eliminarDetalle(detalle): void {
      this.carritoDeComprasService.eliminarDetalleCarrito(detalle.IdDetalleCarritoDeCompras).subscribe(
        (res: any) => {
          this.carritoDeComprasService.listarDetalleCarrito(detalle.IdUsuario);
          this.carritoDeComprasService.CarritoDeComprasUsuario(detalle.IdUsuario);
        },
        err => {
          alert('error');
        }
      );
  }

  editarDetalleCarrito(detalle: DetalleCarritoDeCompras): void {
    this.productoService.buscarProductoIdDetalle(detalle.IdProducto);
    if (detalle.Cantidad == null || detalle.Cantidad <= 0) {
      this.carritoDeComprasService.listarDetalleCarrito(detalle.IdUsuario);
    }else if (detalle.Cantidad > this.productoService.detalleProducto.CantidadStock){
      this.toastr.warning('La cantidad indicada sobrepasa el stock del producto', 'Stock',
        {
          timeOut: 4000,
          positionClass: 'toast-top-center',
        });
      this.carritoDeComprasService.listarDetalleCarrito(detalle.IdUsuario);
    }else {
      this.carritoDeComprasService.CantidadDetalleAnterior(detalle.IdDetalleCarritoDeCompras).subscribe(
        res => {
          this.carritoDeComprasService.editarDetalleCarrito(detalle, res).subscribe(
            resp => {
              this.carritoDeComprasService.CarritoDeComprasUsuario(detalle.IdUsuario);
            }, err => {
              alert('error');
            }
          );
        }, err => {
          alert('error con id detalle anterior');
        }
      );
    }
  }

}
