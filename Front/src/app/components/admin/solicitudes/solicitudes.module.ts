import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarSolicitudesPersonalizadasComponent } from './SolicitudesPersonalizadas/listar-solicitudes-personalizadas/listar-solicitudes-personalizadas.component';
import { GestionSolicitudPersonalizadaComponent } from './SolicitudesPersonalizadas/gestion-solicitud-personalizada/gestion-solicitud-personalizada.component';
import { DetalleSolicitudPersonalizadaComponent } from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-solicitud-personalizada.component';
import { RegistrarEditarProductoSolicitudPerzonalizadaComponent } from './SolicitudesPersonalizadas/registrar-editar-producto-solicitud-perzonalizada/registrar-editar-producto-solicitud-perzonalizada.component';
import {AppRoutingModule} from '../../../app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {ListarDetalleProductoSolicitudComponent} from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/listar-detalle-producto-solicitud/listar-detalle-producto-solicitud.component';

@NgModule({
  declarations: [
    ListarSolicitudesPersonalizadasComponent,
    GestionSolicitudPersonalizadaComponent,
    DetalleSolicitudPersonalizadaComponent,
    RegistrarEditarProductoSolicitudPerzonalizadaComponent,
    ListarDetalleProductoSolicitudComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports:[ListarSolicitudesPersonalizadasComponent, GestionSolicitudPersonalizadaComponent]
})
export class SolicitudesModule { }
