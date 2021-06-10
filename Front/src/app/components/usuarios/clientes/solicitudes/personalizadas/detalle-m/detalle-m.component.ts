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
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
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
  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              private rutaActiva: ActivatedRoute,
              public productoService: ProductoService,
              public usuarioService: UsuarioService,
              public ventasService: VentasService,
              private router: Router,
              public toastr: ToastrService) {
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
                    });
                    this.toastr.success('Su compra se ha realizado exitosamente', 'Compras');
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
        this.toastr.info('Pago cancelado');
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
    Swal.fire({
      title: '¿Está seguro de rechazar la cotización?',
      text: 'Se rechazara la cotización',
      textClass: 'center',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.obtenerPerfil().subscribe(
          res => {
            this.solicitudesPersonalizadasService.DetalleEstadosMontajes =
              this.solicitudesPersonalizadasService.formularioDetalleEstadoMontajes.value;
            this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdUsuario = (res as Usuario).Id;
            this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdEstado = 5;
            this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdMontaje = this.id;
            this.solicitudesPersonalizadasService.AgregarDetalleEstadosMontajes().subscribe(
              (respuesta: any) => {
                Swal.fire(
                  'rechazo de solicitud',
                  'Se ha rechazado con éxito',
                  'success'
                );
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
    });
  }
  Cancelar(): void {
    Swal.fire({
      title: '¿Está seguro de cancelar la solicitud?',
      text: 'Se cancelará la solicitud',
      textClass: 'center',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.obtenerPerfil().subscribe(
          res => {
            this.solicitudesPersonalizadasService.DetalleEstadosMontajes =
              this.solicitudesPersonalizadasService.formularioDetalleEstadoMontajes.value;
            this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdUsuario = (res as Usuario).Id;
            this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdEstado = 11;
            this.solicitudesPersonalizadasService.DetalleEstadosMontajes.IdMontaje = this.id;
            this.solicitudesPersonalizadasService.AgregarDetalleEstadosMontajes().subscribe(
              (respuesta: any) => {
                Swal.fire(
                  'Cancelación de solicitud',
                  'Se ha cancelado con éxito',
                  'success'
                );
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
    });
  }
}
