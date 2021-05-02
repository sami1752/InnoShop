import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarSolicitudesPersonalizadasComponent } from './SolicitudesPersonalizadas/listar-solicitudes-personalizadas/listar-solicitudes-personalizadas.component';
import { GestionSolicitudPersonalizadaComponent } from './SolicitudesPersonalizadas/gestion-solicitud-personalizada/gestion-solicitud-personalizada.component';
import { DetalleSolicitudPersonalizadaComponent } from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-solicitud-personalizada.component';
import { RegistrarEditarProductoSolicitudPerzonalizadaComponent } from './SolicitudesPersonalizadas/registrar-editar-producto-solicitud-perzonalizada/registrar-editar-producto-solicitud-perzonalizada.component';
import {AppRoutingModule} from '../../../app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {ListarDetalleProductoSolicitudComponent} from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/listar-detalle-producto-solicitud/listar-detalle-producto-solicitud.component';
import { DetalleProductosDetalleComponent } from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-productos-detalle/detalle-productos-detalle.component'
import { ListarPrecioComponent} from '../productos/precio/listar-precio/listar-precio.component'
import {ListarImagenComponent} from '../productos/imagen/listar-imagen/listar-imagen.component'
import {ListarDetalleMaterialComponent} from '../productos/listar-detalle-material/listar-detalle-material.component'
import {ListarEntradasComponent} from '../productos/Entrada/listar-entradas/listar-entradas.component'
import {AppModule} from '../../../app.module'
@NgModule({
  declarations: [
    ListarSolicitudesPersonalizadasComponent,
    GestionSolicitudPersonalizadaComponent,
    DetalleSolicitudPersonalizadaComponent,
    RegistrarEditarProductoSolicitudPerzonalizadaComponent,
    ListarDetalleProductoSolicitudComponent,
    DetalleProductosDetalleComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ListarImagenComponent,
    ListarPrecioComponent,
    ListarDetalleMaterialComponent,
    ListarEntradasComponent,
    AppModule
  ],
  exports:[ListarSolicitudesPersonalizadasComponent, GestionSolicitudPersonalizadaComponent]
})
export class SolicitudesModule { }
