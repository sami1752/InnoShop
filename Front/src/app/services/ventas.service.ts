import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Iva} from '../models/iva';
import {Ventas} from '../models/Ventas/ventas';
import {ConfiguracionService} from './configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(
    private http: HttpClient,
    private configuracion: ConfiguracionService,
    private formBuilder: FormBuilder) {
  }

  listaVentas: Ventas[];
  venta: Ventas[];
  iva: Iva;

  ListarVentas(): any {
    this.http.get(this.configuracion.rootURL + '/Ventas').toPromise().then(res => this.listaVentas = res as Ventas[]);
  }

  AgregarVenta(): any {
    return this.http.post(this.configuracion.rootURL + '/Ventas', this.venta);
  }

  ObtenerIvaActual(): any {
    this.http.get(this.configuracion.rootURL + '/IvaActual').toPromise().then(res => this.iva = res as Iva);
  }
}
