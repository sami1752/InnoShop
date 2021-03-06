import { Component, OnInit } from '@angular/core';
import {SolicitudesPersonalizadasService} from '../../../../../../services/solicitudes-personalizadas.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductoService} from '../../../../../../services/producto.service';
import {UsuarioService} from '../../../../../../services/usuario.service';
import {Usuario} from '../../../../../../models/usuario';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {DetalleVentasMontaje} from '../../../../../../models/Ventas/detalle-ventas-Montaje';
import {Venta} from '../../../../../../models/Ventas/venta';
import {VentasService} from '../../../../../../services/ventas.service';
import {Producto} from '../../../../../../models/producto';
import {DetalleVentasProducto} from '../../../../../../models/Ventas/detalle-ventas-producto';
import {ConfiguracionService} from '../../../../../../services/configuracion.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-detalle-m',
  templateUrl: './detalle-m.component.html',
  styleUrls: ['./detalle-m.component.css']
})
export class DetalleMComponent implements OnInit {
  public showPaypalButtons: boolean;
  public payPalConfig ?: IPayPalConfig;
  public PaypalButtons: boolean;
  public DetalleVentasMontaje: DetalleVentasMontaje =
    {IdDetalleVentaMontaje: 0, IdMontaje: 0, IdVenta: 0, Cantidad: 0, SubTotal: 0};
  public detalleVentaProducto: DetalleVentasProducto =
    { IdDetalleVentaProducto: 0, IdProducto: 0, IdVenta: 0, NombreProducto: '', Cantidad: 0, SubTotal: 0 };
  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              private rutaActiva: ActivatedRoute,
              public productoService: ProductoService,
              public usuarioService: UsuarioService,
              public ventasService: VentasService,
              private router: Router,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
  }
  id: number = this.rutaActiva.snapshot.params.IdMontaje;

  ngOnInit(): void {
    this.initConfig();
    this.solicitudesPersonalizadasService.BuscarMontajes(
      this.id
    );
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AVqWU6rPDlF2Rkm2CQUtWH2cZ1l3s96DO_u1FaT6JMbbT12TdOgAjNurv_6dj4TYnQHd39srPNttQhXt',
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.solicitudesPersonalizadasService.Montajes.ValorTotal.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.solicitudesPersonalizadasService.Montajes.ValorTotal.toString()
              }
            }
          },
          items: this.productosVenta(),
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.usuarioService.obtenerPerfil().subscribe(
          res => {
            this.solicitudesPersonalizadasService.DetalleEstadosMontajes =
              this.solicitudesPersonalizadasService.formularioDetalleEstadoMontajes.value;
            this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdUsuario = (res as Usuario).Id;
            this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdEstado = 6;
            this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdMontaje = this.id;
            this.solicitudesPersonalizadasService.AgregarDetalleEstadosMontajes().subscribe(
              (respuesta: any) => {
                this.solicitudesPersonalizadasService.BuscarMontajes(this.id);
                this.ventasService.venta.IdUsuario = res.Id;
                this.ventasService.venta.IdVenta = 0;
                this.ventasService.venta.Total = this.solicitudesPersonalizadasService.Montajes.ValorTotal;
                this.ventasService.AgregarVenta().subscribe(
                  (resV: Venta) => {
                    this.DetalleVentasMontaje.Cantidad = 1;
                    this.DetalleVentasMontaje.IdMontaje = this.id;
                    this.DetalleVentasMontaje.IdVenta = resV.IdVenta;
                    this.DetalleVentasMontaje.SubTotal = this.solicitudesPersonalizadasService.Montajes.ValorTotal;
                    this.DetalleVentasMontaje.IdDetalleVentaMontaje = 0;
                    // tslint:disable-next-line:no-shadowed-variable
                    this.ventasService.AgregarDetalleVentaMontajes(this.DetalleVentasMontaje).subscribe((res: any) => {
                      this.solicitudesPersonalizadasService.listaDetallesProductosMontajes.forEach(detalleProd => {
                        return this.http.get(this.configuracion.rootURL + '/Productos/Detalle/' + detalleProd.IdProducto)
                          .toPromise().then(resdP => {
                            console.log(resdP as Producto);
                            console.log(this.detalleVentaProducto);
                            this.detalleVentaProducto.Cantidad = (resdP as Producto).CantidadStock;
                            this.detalleVentaProducto.IdProducto = detalleProd.IdProducto;
                            this.detalleVentaProducto.IdVenta = resV.IdVenta;
                            this.detalleVentaProducto.SubTotal = 0;
                            this.detalleVentaProducto.IdDetalleVentaProducto = 0;
                            console.log(this.detalleVentaProducto);
                            // tslint:disable-next-line:no-shadowed-variable
                            this.ventasService.agregarDetalleVenta(this.detalleVentaProducto).subscribe((res: any) => {} );
                          });
                      });
                    });
                    alert('Compra realizada con exito');
                    this.router.navigateByUrl('solicitudes/historialCompras');
                  }, err => {
                    alert('Error');
                    console.log(err);
                  }
                );
                this.showPaypalButtons = false;
              }, error => {
                alert(error);
                console.log(error);
              });
          },
          err => {
            console.log(err);
          }
        );
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        alert('Pago cancelado');
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
  Pagar(): void {
    this.PaypalButtons = true;
  }

  productosVenta(): any[] {
    const items: any [] = [];
    let item = {};
    item = {
      name: 'Compra Solicitud Perzonalizada N°' +
        this.solicitudesPersonalizadasService.Montajes.IdMontaje.toString(),
      quantity: '1',
      unit_amount: {
        value: this.solicitudesPersonalizadasService.Montajes.ValorTotal.toString(),
        currency_code: 'USD'
      }
    };
    items.push(item);

    return items;
  }

  Aceptar(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoMontajes.value;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdEstado = 4;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdMontaje = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosMontajes().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarMontajes(this.id);
          }, error => {
            alert(error);
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }

  Devoler(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoMontajes.value;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdEstado = 3;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdMontaje = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosMontajes().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarMontajes(this.id);
          }, error => {
            alert(error);
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }
  Rechazar(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoMontajes.value;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdEstado = 5;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdMontaje = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosMontajes().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarMontajes(this.id);
          }, error => {
            alert(error);
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }
  Cancelar(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoMontajes.value;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdEstado = 11;
        this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdMontaje = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosMontajes().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarMontajes(this.id);
          }, error => {
            alert(error);
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }
}
