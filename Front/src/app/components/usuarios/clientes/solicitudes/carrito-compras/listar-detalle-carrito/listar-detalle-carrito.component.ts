import { Component, OnInit } from '@angular/core';
import { DetalleCarritoDeCompras } from 'src/app/models/detalle-carrito-de-compras';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
import { Usuario } from 'src/app/models/usuario';
import { CarritoDeComprasService } from 'src/app/services/carrito-de-compras.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listar-detalle-carrito',
  templateUrl: './listar-detalle-carrito.component.html',
  styleUrls: ['./listar-detalle-carrito.component.css']
})
export class ListarDetalleCarritoComponent implements OnInit {

  constructor(public carritoDeComprasService:CarritoDeComprasService, public productoService:ProductoService, public usuarioService:UsuarioService) { }

  perfilUsuario;
  ngOnInit(): void {
    //this.productoService.listarImagenes()
    this.productoService.listarTodosPrecios();

    this.usuarioService.obtenerPerfil().subscribe(
      (res:any) => {
        this.perfilUsuario =  res;
        this.carritoDeComprasService.CarritoDeComprasUsuario(res.Id);
        this.carritoDeComprasService.listarDetalleCarrito(res.Id);
      },
      err => {
        console.log(err);
      }
    );
  }

  eliminarDetalle(detalle){
    if(confirm("¿Está seguro de eliminar producto del carrito?")){
      this.carritoDeComprasService.eliminarDetalleCarrito(detalle.IdDetalleCarritoDeCompras).subscribe(
        (res:any)=>{
          this.carritoDeComprasService.listarDetalleCarrito(detalle.IdUsuario);
          this.carritoDeComprasService.CarritoDeComprasUsuario(detalle.IdUsuario);
        },
        err=>{
          alert("error");
        }
      )
    }
  }

  editarDetalleCarrito(detalle:DetalleCarritoDeCompras){
    if(detalle.Cantidad==null || detalle.Cantidad<=0)
      this.carritoDeComprasService.listarDetalleCarrito(detalle.IdUsuario);
    else
    this.carritoDeComprasService.CantidadDetalleAnterior(detalle.IdDetalleCarritoDeCompras).subscribe(
      res=>{
        this.carritoDeComprasService.editarDetalleCarrito(detalle, res).subscribe(
          res=>{
            this.carritoDeComprasService.CarritoDeComprasUsuario(detalle.IdUsuario);
          },err=>{
            alert("error")
          } 
        )
      },err=>{
        alert("error con id detalle anterior")
      }
    );
  }

}
