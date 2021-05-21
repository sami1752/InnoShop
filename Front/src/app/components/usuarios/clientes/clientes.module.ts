import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingModule} from '../../../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { RuletaDescuentosComponent } from './descuentos/ruleta-descuentos/ruleta-descuentos.component';
import { DetalleSPComponent } from './solicitudes/personalizadas/detalle-sp/detalle-sp.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { ListarDetalleProductoComponent } from './solicitudes/personalizadas/detalle-sp/listar-detalle-producto/listar-detalle-producto.component';
import { DetalleDelProductoDelDetalleComponent } from './solicitudes/personalizadas/detalle-sp/listar-detalle-producto/detalle-del-producto-del-detalle/detalle-del-producto-del-detalle.component';
import { DetalleMComponent } from './solicitudes/personalizadas/detalle-m/detalle-m.component';
import { ListarDetalleProductoMComponent } from './solicitudes/personalizadas/detalle-m/listar-detalle-producto-m/listar-detalle-producto-m.component';
import { DetalleDelProductoDelDetalleMComponent } from './solicitudes/personalizadas/detalle-m/listar-detalle-producto-m/detalle-del-producto-del-detalle-m/detalle-del-producto-del-detalle-m.component';
import { NgxPayPalModule } from 'ngx-paypal';


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
    FinalizarCompraComponent,
    RuletaDescuentosComponent,
    DetalleSPComponent,
    ListarDetalleProductoComponent,
    DetalleDelProductoDelDetalleComponent,
    DetalleMComponent,
    ListarDetalleProductoMComponent,
    DetalleDelProductoDelDetalleMComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    NgxPayPalModule
  ],
  exports: []
})
export class ClientesModule { }
