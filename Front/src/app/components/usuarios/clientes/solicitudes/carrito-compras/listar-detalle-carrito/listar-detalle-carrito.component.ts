import { Component, OnInit } from '@angular/core';
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
  restar:boolean = false;
  sumar:boolean = false;
  ngOnInit(): void {
    //this.productoService.listarImagenes()
    this.productoService.listarTodosPrecios();

    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.perfilUsuario =  res;
        this.carritoDeComprasService.listarDetalleCarrito(this.perfilUsuario.Id)
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
          alert(res.mensaje);
          this.carritoDeComprasService.listarDetalleCarrito(detalle.IdUsuario);
        },
        err=>{
          alert("error");
        }
      )
    }
  }

  editarDetalleCarrito(detalle){
    this.carritoDeComprasService.editarDetalleCarrito(detalle).subscribe(
      res=>{
        alert("Edicion exitosa");
      },err=>{
        alert("error")
      } 
    )
  }

}
