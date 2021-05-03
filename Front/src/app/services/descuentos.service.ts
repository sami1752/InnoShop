import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Descuento } from '../models/Descuentos/descuento';
import { PorcentajesRuleta } from '../models/Descuentos/porcentajes-ruleta';
import { ValorRuleta } from '../models/Descuentos/valor-ruleta';
import { PerfilUsuario } from '../models/perfil-usuario';
import { ConfiguracionService } from './configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class DescuentosService {

  constructor(
    private http: HttpClient,
    private configuracion: ConfiguracionService,
    private formBuilder: FormBuilder) { }

    idUsuario:string=""

    listaPorcentajes: PorcentajesRuleta[]
    listaCuponesClientes:Descuento[]
    listaValoresRuleta:ValorRuleta[]
    valorRuleta:ValorRuleta = {IdValorRuleta:0,IdUsuario:"",ValorDeRuleta:0,FechaInicio:"",FechaFin:""}
    descuento: Descuento = {IdDescuento:0, IdUsuario:"",Fecha:"",FechaVencimiento:"",Estado:false,IdPorcentajeRuleta:0,IdValorRuleta:0,PorcentajeDescuento:0}
    porcentajeRuleta:PorcentajesRuleta = {IdPorcentajeRuleta:0,Porcentaje:0,Estado:false,IdUsuario:"",Fecha:""}

    formPorcentaje:boolean=false;
    formValorRuleta:boolean=false;

    formRegistroPorcentaje = this.formBuilder.group({
      Porcentaje: []
    });
    formRegistroValorDeRuleta = this.formBuilder.group({
      ValorDeRuleta: []
    });




    ListarPorcentajeDescuentos(){
      this.http.get(this.configuracion.rootURL+'/Descuentos/Porcentajes').toPromise().
      then(res=>this.listaPorcentajes = res as PorcentajesRuleta[])
    }
    ListarCuponesDeCliente(idUsuario:string){
      this.http.get(this.configuracion.rootURL+'/Descuentos/'+idUsuario).toPromise().
      then(res => this.listaCuponesClientes = res as Descuento[])
    }

    listarValoresRuleta(){
      this.http.get(this.configuracion.rootURL+'/Descuentos/ValoresRuleta').toPromise().
      then(res => this.listaValoresRuleta = res as ValorRuleta[])
    }

    ValorRuletaActual(){
      this.http.get(this.configuracion.rootURL+'/Descuentos/ValorActualRuleta').toPromise().
      then(res => this.valorRuleta = res as ValorRuleta)
    }

    fecha = new Date();
    tiempoTranscurrido = Date.now();
    hoy = new Date(this.tiempoTranscurrido);

    RegistrarCuponDescuento(){
      this.descuento.IdDescuento = 0
      this.descuento.Fecha = this.hoy.toISOString()
      this.descuento.FechaVencimiento = this.hoy.toISOString()
      this.descuento.Estado = true
      this.descuento.IdPorcentajeRuleta = 1
      this.descuento.IdValorRuleta = this.valorRuleta.IdValorRuleta

     return  this.http.post(this.configuracion.rootURL+'/Descuentos',this.descuento)
    }

    RegistrarPorcentaje(){
      this.porcentajeRuleta = this.formRegistroPorcentaje.value
      this.porcentajeRuleta.Estado = true
      this.porcentajeRuleta.Fecha = this.hoy.toISOString()
      this.porcentajeRuleta.IdUsuario = this.idUsuario
      return this.http.post(this.configuracion.rootURL+'/Descuentos/AgregarPorcentaje',this.porcentajeRuleta)
    }
    RegistrarValorRuleta(){
      this.valorRuleta = this.formRegistroValorDeRuleta.value
      this.valorRuleta.FechaInicio = this.hoy.toISOString()
      this.valorRuleta.FechaFin = "0001-01-01"
      this.valorRuleta.IdUsuario = this.idUsuario
      return this.http.post(this.configuracion.rootURL+'/Descuentos/AgregarValorRuleta',this.valorRuleta)
    }
    EditarPorcentaje(porcentaje:PorcentajesRuleta){
      porcentaje.Estado = !porcentaje.Estado
      return this.http.put(this.configuracion.rootURL+'/Descuentos/editarPorcentaje',porcentaje)
    }

} 