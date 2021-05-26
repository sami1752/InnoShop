import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Iva} from '../models/iva';
import {ConfiguracionService} from './configuracion.service';
import {Precio} from '../models/precio';
import {DetalleVentasProducto} from '../models/Ventas/detalle-ventas-producto';
import {DetalleVentas} from '../models/Ventas/detalleventas';
import {Venta} from '../models/Ventas/venta';
import {UsuarioService} from './usuario.service';
import {ProductoService} from './producto.service';
import {DetalleVentasSolicitud} from '../models/Ventas/detalle-ventas-Solicitud';
import {DescuentosService} from './descuentos.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(
    private http: HttpClient,
    private configuracion: ConfiguracionService,
    private formBuilder: FormBuilder,
    private productosService: ProductoService,
    private descuentosService: DescuentosService) {
  }

  listaVentas: DetalleVentas[];
  listaDetalleVentaProductos: DetalleVentasProducto[];
  fecha = new Date();
  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);
  desplegarDetalle = false;
  desplegarDetalleVentaEnRegistro = false;
  iva: Iva;
  venta: Venta = {IdVenta: 0, Fecha: '', IdUsuario: '', IdDescuento: 0, Total: 0, IdIva: 0, TotalIva: 0};
  detalleVenta: DetalleVentas;
  detalleVentaSolicitudes: DetalleVentasSolicitud;


  formularioRegistroVenta = this.formBuilder.group({
    IdProducto: [],
    IdVenta: [0],
    Cantidad: [1, [Validators.required, Validators.pattern(this.configuracion.exRegularNumeros)]],
  }, {
    validator: this.validarStock.bind(this)
  });

  validarStock(formGroup: FormGroup): any {
    const cantidad = formGroup.get('Cantidad');
    // tslint:disable-next-line:triple-equals
    if (this.productosService.detalleProducto != undefined) {
      const stock = this.productosService.detalleProducto.CantidadStock;
      if (cantidad.errors == null || 'validarStock' in cantidad) {
        if (cantidad.value > stock) {
          cantidad.setErrors({
            validarStock: true
          });
        } else {
          cantidad.setErrors(null);
        }
      }
    }
  }

  get CantidadV(): any {
    return this.formularioRegistroVenta.controls.Cantidad.value;
  }

  get Cantidad(): any {
    return this.formularioRegistroVenta.controls.Cantidad;
  }

  get IdVenta(): any {
    return this.formularioRegistroVenta.controls.IdVenta.value;
  }


  agregarDetalleVenta(detalleVentaProducto: DetalleVentasProducto): any {
    return this.http.post(this.configuracion.rootURL + '/Ventas/AgregarProducto', detalleVentaProducto);
  }

  AgregarDetalleVentaSolicitudes(detalleVentasSolicitud: DetalleVentasSolicitud): any {
    return this.http.post(this.configuracion.rootURL + '/Ventas/DetalleVentaSolicitud', detalleVentasSolicitud);
  }

  ListarVentas(): any {
    this.http.get(this.configuracion.rootURL + '/Ventas').toPromise().then(res => this.listaVentas = res as DetalleVentas[]);
  }

  listarVentasPorUsuario(idUsuario): any {
    // tslint:disable-next-line:max-line-length
    this.http.get(this.configuracion.rootURL + '/Ventas/compras/'
      + idUsuario).toPromise().then(res => this.listaVentas = res as DetalleVentas[]);
  }


  AgregarVenta(): any {
    this.venta.Fecha = '0001-01-01';
    this.venta.IdDescuento = this.descuentosService.descuentoEnVenta.IdDescuento;
    console.log(this.venta);
    return this.http.post(this.configuracion.rootURL + '/Ventas', this.venta);
  }

  ListarDetalleVentasProductos(idVenta: number): any {
    this.http.get(this.configuracion.rootURL + '/Ventas/detalleVentaProductos/' +
      idVenta).toPromise().then(res => this.listaDetalleVentaProductos = res as DetalleVentasProducto[]);
  }

  DetalleVenta(idVenta: number): any {
    this.http.get(this.configuracion.rootURL + '/Ventas/' + idVenta).toPromise().then(res => this.detalleVenta = res as DetalleVentas);
  }

  ObtenerIvaActual(): any {
    return this.http.get(this.configuracion.rootURL + '/Ventas/IvaActual').toPromise().then(res => this.iva = res as Iva);
  }

}
