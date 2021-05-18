import {Component, NgModule, OnInit} from '@angular/core';
import {ProductoService} from 'src/app/services/producto.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CarritoDeComprasService} from 'src/app/services/carrito-de-compras.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {Usuario} from 'src/app/models/usuario';
import {CarritoDeCompras} from 'src/app/models/carrito-de-compras';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {OwlModule} from 'ngx-owl-carousel';
import {Imagen} from 'src/app/models/imagen';

@Component({
  selector: 'app-detalle-producto-cliente',
  templateUrl: './detalle-producto-cliente.component.html',
  styleUrls: ['./detalle-producto-cliente.component.css']
})
export class DetalleProductoClienteComponent implements OnInit {

  constructor(public carritoDeComprasService: CarritoDeComprasService, public usuarioService: UsuarioService,
              public productoService: ProductoService, private router: Router, private rutaActiva: ActivatedRoute) {
  }

  id: number = this.rutaActiva.snapshot.params.IdProducto;
  detalleExiste = false;
  carritoRespuesta;
  perfilUsuario;
  CarritoExiste;
  homeSlider = {items: 1, dots: true, nav: true};
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  };

  ngOnInit(): void {
    this.productoService.buscarProductoIdDetalle(this.id);
    this.productoService.ListarDetalleMaterial(this.id);
    this.productoService.listarImagen(this.id);
    this.usuarioService.obtenerPerfil().subscribe(
      (res: any) => {
        this.carritoDeComprasService.listarDetalleCarrito(res.Id);
      },
      err => {
      });
  }



  agregarCarrito(idProducto): void {
    if (localStorage.getItem('token') != null) {
      this.usuarioService.obtenerPerfil().subscribe(
        res => {
          this.perfilUsuario = (res as Usuario);
          this.carritoDeComprasService.carritoDeCompras.IdUsuario = this.perfilUsuario.Id;
          this.carritoDeComprasService.detalleCarritoDeCompras.IdUsuario = this.perfilUsuario.Id;
          this.carritoDeComprasService.existeCarritoUsuario(this.perfilUsuario.Id).subscribe(
            (resp: any) => {
              this.CarritoExiste = resp.mensaje;
              if (this.CarritoExiste === 0) {
                this.carritoDeComprasService.agregarCarritoDeCompras().subscribe(
                  (respuesta: any) => {
                    this.carritoRespuesta = (respuesta.mensaje as CarritoDeCompras);
                    this.carritoDeComprasService.detalleCarritoDeCompras.IdUsuario = this.carritoRespuesta.IdUsuario;
                    this.carritoDeComprasService.detalleCarritoDeCompras.IdCarritoDeCompras = this.carritoRespuesta.IdCarritoDeCompras;
                    this.carritoDeComprasService.agregarDetalleCarrito(idProducto).subscribe(
                      respu => {
                        alert('Se agrego producto con exito');
                      },
                      err => {
                        alert('error');
                      }
                    );
                  }, error => {
                    alert('error al buscar carrito de usuario');
                    console.log(error);
                  });

              } else {
                this.carritoDeComprasService.listarDetalleCarrito(this.perfilUsuario.Id);
                this.carritoDeComprasService.listaDetalleCarritoCompras.forEach(element => {
                  if (element.IdProducto === idProducto) {
                    this.detalleExiste = true;
                    this.carritoDeComprasService.CantidadDetalleAnterior(element.IdDetalleCarritoDeCompras).subscribe(
                      respu => {
                        element.Cantidad++;
                        this.carritoDeComprasService.editarDetalleCarrito(element, res).subscribe(
                          resput => {
                            this.carritoDeComprasService.listarDetalleCarrito(this.perfilUsuario.Id);
                            alert('Se sumo producto al carrito con exito');
                          }, err => {
                          }
                        );
                      },
                      err => {
                        alert('error al buscar cantidad anterior');
                      }
                    );
                  }
                });
                if (!this.detalleExiste) {
                  this.carritoDeComprasService.detalleCarritoDeCompras.IdCarritoDeCompras = this.CarritoExiste;
                  this.carritoDeComprasService.agregarDetalleCarrito(idProducto).subscribe(
                    respu => {

                      alert('Se agrego producto a carrito existente');
                    },
                    err => {
                      alert('error detalle solito');
                      console.log(err);
                    }
                  );
                }
              }


            }, err => {
              alert('error en carro existe');
            }
          );
        },
        err => {
          console.log(err);
        }
      );
    } else {
      alert('Antes de realizar tu pedido inicia sesión');
      this.router.navigate(['usuarios/login']);
    }
  }



}
