import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingModule} from '../../../app-routing.module';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListarProductosComponent } from './productos/listar-productos/listar-productos.component';
import { ListarDetalleCarritoComponent } from './solicitudes/carrito-compras/listar-detalle-carrito/listar-detalle-carrito.component';
import { PersonalizadasComponent } from './solicitudes/personalizadas/personalizadas.component';
import { RegistrarSolicitudPErsonalizadaComponent } from './solicitudes/personalizadas/registrar-solicitud-personalizada/registrar-solicitud-personalizada.component';



@NgModule({
  declarations: [
    ListarProductosComponent,
    ListarDetalleCarritoComponent,
    PersonalizadasComponent,
    RegistrarSolicitudPErsonalizadaComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: []
})
export class ClientesModule { }
