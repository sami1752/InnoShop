import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SolicitudesPersonalizadasService} from '../../../../../../services/solicitudes-personalizadas.service';
import {ProductoService} from '../../../../../../services/producto.service';
import {Usuario} from '../../../../../../models/usuario';
import {UsuarioService} from '../../../../../../services/usuario.service';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {environment} from 'src/environments/environment';
import {DetalleVentasProducto} from '../../../../../../models/Ventas/detalle-ventas-producto';
import {DetalleCarritoDeCompras} from '../../../../../../models/detalle-carrito-de-compras';
import {DetalleVentasSolicitud} from '../../../../../../models/Ventas/detalle-ventas-Solicitud';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {VentasService} from '../../../../../../services/ventas.service';
import {Venta} from '../../../../../../models/Ventas/venta';

@Component({
  selector: 'app-detalle-sp',
  templateUrl: './detalle-sp.component.html',
  styleUrls: ['./detalle-sp.component.css']
})
export class DetalleSPComponent implements OnInit {
  public showPaypalButtons: boolean;
  public payPalConfig ?: IPayPalConfig;
  public PaypalButtons: boolean;
  public DetalleVentasSolicitud: DetalleVentasSolicitud =
    {IdDetalleVentasSolicitud: 0, IdSolictud: 0, IdVenta: 0, Cantidad: 0, SubTotal: 0};

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              private rutaActiva: ActivatedRoute,
              public productoService: ProductoService,
              public usuarioService: UsuarioService,
              public productosService: ProductoService,
              public ventasService: VentasService,
              private http: HttpClient,
              private router: Router) {
  }

  id: number = this.rutaActiva.snapshot.params.IdSolicitud;

  ngOnInit(): void {
    this.initConfig();
    this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(
      this.id
    );
  }

  private initConfig(): void {
    alert('sdgg');

    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AVqWU6rPDlF2Rkm2CQUtWH2cZ1l3s96DO_u1FaT6JMbbT12TdOgAjNurv_6dj4TYnQHd39srPNttQhXt',
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.solicitudesPersonalizadasService.SolicitudPersonalizada.ValorTotal.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.solicitudesPersonalizadasService.SolicitudPersonalizada.ValorTotal.toString()
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
            this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada =
              this.solicitudesPersonalizadasService.formularioDetalleEstadoSolicitudPerzonalizada.value;
            this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdUsuario = (res as Usuario).Id;
            this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdEstado = 6;
            this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdSolicitudPersonalizada = this.id;
            this.solicitudesPersonalizadasService.AgregarDetalleEstadosSolicitudPersonalizada().subscribe(
              (respuesta: any) => {
                this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id);
                this.ventasService.venta.IdUsuario = res.Id;
                this.ventasService.AgregarVenta().subscribe(
                  (resV: Venta) => {
                    this.DetalleVentasSolicitud.Cantidad = 1;
                    this.DetalleVentasSolicitud.IdSolictud =
                      this.solicitudesPersonalizadasService.SolicitudPersonalizada.IdSolicitudPersonalizada;
                    this.DetalleVentasSolicitud.IdVenta = resV.IdVenta;
                    this.DetalleVentasSolicitud.SubTotal = this.solicitudesPersonalizadasService.SolicitudPersonalizada.ValorTotal;
                    this.DetalleVentasSolicitud.IdDetalleVentasSolicitud = 0;
                    // tslint:disable-next-line:no-shadowed-variable
                    this.ventasService.AgregarDetalleVentaSolicitudes(this.DetalleVentasSolicitud).subscribe((res: any) => {
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
        this.solicitudesPersonalizadasService.SolicitudPersonalizada.IdSolicitudPersonalizada.toString(),
      quantity: '1',
      unit_amount: {
        value: this.solicitudesPersonalizadasService.SolicitudPersonalizada.ValorTotal.toString(),
        currency_code: 'USD'
      }
    };
    items.push(item);

    return items;
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
            this.PaypalButtons = false;
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

  pdf(): void {

  }

  downloadPDF(): void {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }


}
