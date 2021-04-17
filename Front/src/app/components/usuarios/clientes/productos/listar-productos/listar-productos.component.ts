import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoDeCompras } from 'src/app/models/carrito-de-compras';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
import { Usuario } from 'src/app/models/usuario';
import { CarritoDeComprasService } from 'src/app/services/carrito-de-compras.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  constructor(public router:Router,public productoService:ProductoService,
    public usuarioService:UsuarioService, public CarritoDeComprasService:CarritoDeComprasService,
    public configuracionService:ConfiguracionService) { }

  subtotal:number;


  ngOnInit(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.usuarioService.perfilUsuario = < Usuario >  res;
        if(this.usuarioService.perfilUsuario.IdRol == 1){
          this.router.navigate(['Admin/inicioadmin']);
        }
      },
      err => {
        console.log(err);
        alert("error");
      }
    );
    this.productoService.listarProducto()
    this.productoService.listarImagenes()
    this.productoService.listarTodosPrecios()
    this.CarritoDeComprasService.listarTodosDetalleCarrito()
  }

  carritoRespuesta;
  perfilUsuario;
  CarritoExiste;

  agregarCarrito(idProducto){
    if(localStorage.getItem('token') != null){
      this.usuarioService.obtenerPerfil().subscribe(
        res => {
            this.perfilUsuario = (res as Usuario)
            this.CarritoDeComprasService.carritoDeCompras.IdUsuario = this.perfilUsuario.Id;
            this.CarritoDeComprasService.detalleCarritoDeCompras.IdUsuario = this.perfilUsuario.Id;
            this.CarritoDeComprasService.existeCarritoUsuario(this.perfilUsuario.Id).subscribe(
              (resp:any)=>{
                  this.CarritoExiste = resp.mensaje;
                  if(this.CarritoExiste==0){
                    this.CarritoDeComprasService.agregarCarritoDeCompras().subscribe( 
                      (respuesta: any) => {
                        this.carritoRespuesta = (respuesta.mensaje as CarritoDeCompras);
                        this.CarritoDeComprasService.detalleCarritoDeCompras.IdUsuario = this.carritoRespuesta.IdUsuario;
                        this.CarritoDeComprasService.detalleCarritoDeCompras.IdCarritoDeCompras = this.carritoRespuesta.IdCarritoDeCompras;
                        this.CarritoDeComprasService.agregarDetalleCarrito(idProducto).subscribe(
                          res=>{
                            alert("Se agrego producto con exito");
                          },
                          err=>{
                            alert("error");
                          }
                        );
                      }, error => {
                        alert("error al buscar carrito de usuario")
                        console.log(error);
                      });

                  }else{
                      this.CarritoDeComprasService.detalleCarritoDeCompras.IdCarritoDeCompras = this.CarritoExiste;
                      this.CarritoDeComprasService.agregarDetalleCarrito(idProducto).subscribe(
                      res=>{
                        alert("Se agrego producto a carrito existente");
                      },
                      err=>{
                        alert("error detalle solito");
                        console.log(err);
                      }
                    )}

                    },err=>{
                      alert("error en carro existe");
                    }
                  );
        },
        err => {
          console.log(err);
        }
      );
    }else{
      alert("Antes de realizar tu pedido inicia sesión");
      this.router.navigate(['usuarios/login']);
    } 
  }
}
