import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Iva } from '../models/iva';
import { Precio } from '../models/precio';
import { DetalleVentasProducto } from '../models/Ventas/detalle-ventas-producto';
import { DetalleVentas } from '../models/Ventas/detalleventas';
import { Venta } from '../models/Ventas/venta';
import { ConfiguracionService } from './configuracion.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(
    private http: HttpClient,
    private configuracion: ConfiguracionService,
    private formBuilder: FormBuilder) { }

    listaVentas:DetalleVentas[]
    listaDetalleVentaProductos:DetalleVentasProducto[]

    desplegarDetalle:boolean =false
    desplegarDetalleVentaEnRegistro:boolean =false
    iva:Iva 
    venta:Venta = {IdVenta:0,Fecha:"",IdUsuario:"",IdDescuento:0,SubTotal:0,Total:0,IdIva:0,TotalIva:0}
    detalleVenta:DetalleVentas

    

    formularioRegistroVenta = this.formBuilder.group({
      IdProducto:[],
      IdVenta:[0],
      Cantidad:[1]
    });
    get Cantidad() {
      return this.formularioRegistroVenta.controls["Cantidad"].value;
    }
    get IdVenta() {
      return this.formularioRegistroVenta.controls["IdVenta"].value;
    }


    agregarDetalleVenta(detalleVentaProducto:DetalleVentasProducto){
      return this.http.post(this.configuracion.rootURL+'/Ventas/AgregarProducto',detalleVentaProducto)
    }

    ListarVentas(){
      this.http.get(this.configuracion.rootURL+'/Ventas').toPromise().
      then(res=>this.listaVentas = res as DetalleVentas[])
    }
    fecha = new Date();
    tiempoTranscurrido = Date.now();
    hoy = new Date(this.tiempoTranscurrido);
    AgregarVenta(){
      this.venta.Fecha = this.hoy.toISOString()
      this.venta.IdDescuento=17
      return this.http.post(this.configuracion.rootURL+'/Ventas',this.venta)
    }

    ListarDetalleVentasProductos(idVenta:number){
      this.http.get(this.configuracion.rootURL+'/Ventas/detalleVentaProductos/'+idVenta).toPromise().
      then(res=>this.listaDetalleVentaProductos = res as DetalleVentasProducto[])
    }

    DetalleVenta(idVenta:number){
      this.http.get(this.configuracion.rootURL+'/Ventas/'+idVenta).toPromise().
      then(res=>this.detalleVenta = res as DetalleVentas)
    }
    ObtenerIvaActual(){
      return this.http.get(this.configuracion.rootURL+'/Ventas/IvaActual').toPromise().
      then(res=> this.iva = res as Iva)
    }
    
}
