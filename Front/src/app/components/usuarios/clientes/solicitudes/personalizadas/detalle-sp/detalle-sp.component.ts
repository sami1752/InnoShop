import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SolicitudesPersonalizadasService} from '../../../../../../services/solicitudes-personalizadas.service';
import {ProductoService} from '../../../../../../services/producto.service';
import {Usuario} from '../../../../../../models/usuario';
import {UsuarioService} from '../../../../../../services/usuario.service';
import {ICreateOrderRequest} from 'ngx-paypal';

@Component({
  selector: 'app-detalle-sp',
  templateUrl: './detalle-sp.component.html',
  styleUrls: ['./detalle-sp.component.css']
})
export class DetalleSPComponent implements OnInit {
  public payPalConfig: any;
  public showPaypalButtons: boolean;
  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              private rutaActiva: ActivatedRoute,
              public productoService: ProductoService,
              public usuarioService: UsuarioService) {
  }
  id: number = this.rutaActiva.snapshot.params.IdSolicitud;

  ngOnInit(): void {
    this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(
      this.id
    );
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AVqWU6rPDlF2Rkm2CQUtWH2cZ1l3s96DO_u1FaT6JMbbT12TdOgAjNurv_6dj4TYnQHd39srPNttQhXt',
      createOrder: data =>
        <ICreateOrderRequest> {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: '0',
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: '1000'
                  }
                }
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: '1000'
                  }
                }
              ]
            }
          ]
        },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then(details => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        })
        this.usuarioService.obtenerPerfil().subscribe(
          res => {
            this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada =
              this.solicitudesPersonalizadasService.formularioDetalleEstadoSolicitudPerzonalizada.value;
            this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdUsuario = (res as Usuario).Id;
            this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdEstado = 6;
            this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdSolicitudPersonalizada = this.id;
            this.solicitudesPersonalizadasService.AgregarDetalleEstadosSolicitudPersonalizada().subscribe(
              (respuesta: any) => {

                this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id);
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
      onClientAuthorization: data => {

        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }

  pay(): void  {
    this.showPaypalButtons = true;
  }

  back(): void  {
    this.showPaypalButtons = false;
  }

  Aceptar(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoSolicitudPerzonalizada.value;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdEstado = 4;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdSolicitudPersonalizada = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosSolicitudPersonalizada().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id);
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
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoSolicitudPerzonalizada.value;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdEstado = 5;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdSolicitudPersonalizada = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosSolicitudPersonalizada().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id);
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
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoSolicitudPerzonalizada.value;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdEstado = 11;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdSolicitudPersonalizada = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosSolicitudPersonalizada().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id);
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
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada =
          this.solicitudesPersonalizadasService.formularioDetalleEstadoSolicitudPerzonalizada.value;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdEstado = 3;
        this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdSolicitudPersonalizada = this.id;
        this.solicitudesPersonalizadasService.AgregarDetalleEstadosSolicitudPersonalizada().subscribe(
          (respuesta: any) => {

            this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id);
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
