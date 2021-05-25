import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CarritoDeCompras} from '../models/carrito-de-compras';
import {DetalleCarritoDeCompras} from '../models/detalle-carrito-de-compras';
import {ConfiguracionService} from './configuracion.service';
import {ProductoService} from './producto.service';
import {UsuarioService} from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoDeComprasService {

  constructor(public usuarioService: UsuarioService, private http: HttpClient,
              private configuracion: ConfiguracionService, private formBuilder: FormBuilder, public productoService: ProductoService) {
  }

  carritoDeCompras: CarritoDeCompras = {IdCarritoDeCompras: 0, IdUsuario: '', Fecha: '', Estado: false, Valor: 0};
  detalleCarritoDeCompras: DetalleCarritoDeCompras = {
    IdDetalleCarritoDeCompras: 0,
    IdCarritoDeCompras: 0,
    IdUsuario: '',
    IdProducto: 0,
    Cantidad: 1,
    NombreProducto: ''
  };
  carritoExistente = 0;
  listaDetalleCarritoCompras: DetalleCarritoDeCompras[];

  agregarCarritoDeCompras(): any {
    this.carritoDeCompras.Estado = false;
    this.carritoDeCompras.Fecha = '1111-11-11';
    return this.http.post(this.configuracion.rootURL + '/Solicitudes/CarritoDeCompras', this.carritoDeCompras);
  }

  agregarDetalleCarrito(idProducto): any {
    this.detalleCarritoDeCompras.Cantidad = 1;
    this.detalleCarritoDeCompras.IdProducto = idProducto;
    return this.http.post(this.configuracion.rootURL + '/Solicitudes/DetalleCarritoDeCompras', this.detalleCarritoDeCompras);
  }

  editarCarrito(): any {
    console.log(this.carritoDeCompras);
    this.carritoDeCompras.Estado = true;
    return this.http.put(this.configuracion.rootURL + '/Solicitudes/CarritoDeCompras', this.carritoDeCompras);
  }

  editarDetalleCarrito(detalleCarrito, cant): any {
    return this.http.put(this.configuracion.rootURL + '/Solicitudes/DetalleCarritoDeCompras/' + cant, detalleCarrito);
  }

  existeCarritoUsuario(idUsuario): any {
    return this.http.get(this.configuracion.rootURL + '/Solicitudes/ExisteCarrito/' + idUsuario);
  }


  listarDetalleCarrito(idUsuario): any {
    this.http.get(this.configuracion.rootURL + '/Solicitudes/ListaDetalleCarritoDeCompras/' + idUsuario).toPromise()
      .then(res => this.listaDetalleCarritoCompras = res as DetalleCarritoDeCompras[]);
  }

  eliminarDetalleCarrito(idDetalle): any {
    return this.http.delete(this.configuracion.rootURL + '/Solicitudes/EliminarDetalle/' + idDetalle);
  }

  CantidadDetalleAnterior(idDetalle): any {
    return this.http.get(this.configuracion.rootURL + '/Solicitudes/DetalleCarritoCantidadAnterior/' + idDetalle);
  }

  CarritoDeComprasUsuario(idUsuario): any {
    this.http.get(this.configuracion.rootURL + '/Solicitudes/CarritoDeComprasUsuario/' + idUsuario).
    toPromise().then(res => this.carritoDeCompras = res as CarritoDeCompras);
  }
}
