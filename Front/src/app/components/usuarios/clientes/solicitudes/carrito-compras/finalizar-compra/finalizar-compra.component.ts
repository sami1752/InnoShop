import {Component, OnInit} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {CarritoDeCompras} from 'src/app/models/carrito-de-compras';
import {DetalleCarritoDeCompras} from 'src/app/models/detalle-carrito-de-compras';
import {DetalleVentasProducto} from 'src/app/models/Ventas/detalle-ventas-producto';
import {Venta} from 'src/app/models/Ventas/venta';
import {CarritoDeComprasService} from 'src/app/services/carrito-de-compras.service';
import {ProductoService} from 'src/app/services/producto.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {VentasService} from 'src/app/services/ventas.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css']
})
export class FinalizarCompraComponent implements OnInit {

  constructor(public carritoDeComprasService: CarritoDeComprasService,
              public productosService: ProductoService,
              public usuarioService: UsuarioService,
              public ventasService: VentasService) {
  }

  public payPalConfig ?: IPayPalConfig;
  public PaypalButtons: boolean;
  public detalleVentaProducto: DetalleVentasProducto;

  ngOnInit(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      (res: any) => {
        this.initConfig(res.Id);
        this.carritoDeComprasService.CarritoDeComprasUsuario(res.Id);
        this.carritoDeComprasService.listarDetalleCarrito(res.id);
      }, err => {
      }
    );
  }

  private initConfig(idUsuario: string): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: environment.clienteId,
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: this.carritoDeComprasService.carritoDeCompras.Valor.toString(),
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.carritoDeComprasService.carritoDeCompras.Valor.toString()
              }
            }
          },
          items: this.productosVenta()
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
          /* this.ventasService.AgregarVenta().subscribe(
             (res:Venta)=>{
               this.carritoDeComprasService.listarDetalleCarrito(idUsuario)
               this.carritoDeComprasService.listaDetalleCarritoCompras.forEach((dCar:DetalleCarritoDeCompras)=>{
               this.detalleVentaProducto.Cantidad = dCar.Cantidad
               this.detalleVentaProducto.IdProducto = dCar.IdProducto
               this.detalleVentaProducto.IdVenta = res.IdVenta
               this.detalleVentaProducto.SubTotal = 0
               })
               //this.ventasService.agregarDetalleVenta()
             },err=>{alert("Error")}
           )*/
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  productosVenta(): any[] {
    const items: any [] = [];
    let item = {};
    this.carritoDeComprasService.listaDetalleCarritoCompras.forEach((dCar: DetalleCarritoDeCompras) => {
      this.productosService.listarPrecios(dCar.IdProducto);
      item = {
        name: dCar.NombreProducto,
        quantity: dCar.Cantidad.toString(),
        unit_amount: {
          value: this.productosService.listaPrecios[this.productosService.listaPrecios.length - 1].Precio.toString(),
          currency_code: 'EUR'
        }
      };
      items.push(item);
    });
    return items;
  }


}
