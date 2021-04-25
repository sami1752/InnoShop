import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarSolicitudesPersonalizadasComponent } from './SolicitudesPersonalizadas/listar-solicitudes-personalizadas/listar-solicitudes-personalizadas.component';
import { GestionSolicitudPersonalizadaComponent } from './SolicitudesPersonalizadas/gestion-solicitud-personalizada/gestion-solicitud-personalizada.component';
import { DetalleSolicitudPersonalizadaComponent } from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-solicitud-personalizada.component';



@NgModule({
  declarations: [
    ListarSolicitudesPersonalizadasComponent,
    GestionSolicitudPersonalizadaComponent,
    DetalleSolicitudPersonalizadaComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ListarSolicitudesPersonalizadasComponent, GestionSolicitudPersonalizadaComponent]
})
export class SolicitudesModule { }
