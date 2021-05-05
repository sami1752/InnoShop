import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingModule} from '../../../app-routing.module';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListarProductosComponent } from './productos/listar-productos/listar-productos.component';
import { ListarDetalleCarritoComponent } from './solicitudes/carrito-compras/listar-detalle-carrito/listar-detalle-carrito.component';
import { PersonalizadasComponent } from './solicitudes/personalizadas/personalizadas.component';
import { RegistrarSolicitudPErsonalizadaComponent } from './solicitudes/personalizadas/registrar-solicitud-personalizada/registrar-solicitud-personalizada.component';
import { DetalleProductoClienteComponent } from './productos/detalle-producto-cliente/detalle-producto-cliente.component';
import { ListarMisSolicitudesPersonalizadasComponent } from './solicitudes/personalizadas/listar-mis-solicitudes-personalizadas/listar-mis-solicitudes-personalizadas.component';
import { ListarMisMontajesComponent } from './solicitudes/personalizadas/listar-mis-montajes/listar-mis-montajes.component';
import { RegistrarMontajesComponent } from './solicitudes/personalizadas/registrar-montajes/registrar-montajes.component';
import { FinalizarCompraComponent } from './solicitudes/carrito-compras/finalizar-compra/finalizar-compra.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    ListarProductosComponent,
    ListarDetalleCarritoComponent,
    PersonalizadasComponent,
    RegistrarSolicitudPErsonalizadaComponent,
    DetalleProductoClienteComponent,
    ListarMisSolicitudesPersonalizadasComponent,
    ListarMisMontajesComponent,
    RegistrarMontajesComponent,
    FinalizarCompraComponent
    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule
  ],
  exports: []
})
export class ClientesModule { }
