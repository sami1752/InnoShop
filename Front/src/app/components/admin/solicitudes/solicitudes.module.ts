import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarSolicitudesPersonalizadasComponent } from './SolicitudesPersonalizadas/listar-solicitudes-personalizadas/listar-solicitudes-personalizadas.component';
import { GestionSolicitudPersonalizadaComponent } from './SolicitudesPersonalizadas/gestion-solicitud-personalizada/gestion-solicitud-personalizada.component';
import { DetalleSolicitudPersonalizadaComponent } from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-solicitud-personalizada.component';
import { RegistrarEditarProductoSolicitudPerzonalizadaComponent } from './SolicitudesPersonalizadas/registrar-editar-producto-solicitud-perzonalizada/registrar-editar-producto-solicitud-perzonalizada.component';
import {AppRoutingModule} from '../../../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListarDetalleProductoComponent} from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/listar-detalle-producto/listar-detalle-producto.component';
import { DetalleProductoDetalleComponent } from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/detalle-producto-detalle.component';
import { ListarPrecioProductoComponent } from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/listar-precio-producto/listar-precio-producto.component';
import { ListarMaterialProductoComponent } from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/listar-material-producto/listar-material-producto.component';
import { ListarEntradasProductoComponent } from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/listar-entradas-producto/listar-entradas-producto.component';
import { AgregarEntradaPSComponent } from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/listar-entradas-producto/agregar-entrada-ps/agregar-entrada-ps.component';
import { AgregarMaterialComponent } from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/listar-material-producto/agregar-material/agregar-material.component';
import { AgregarPrecioComponent } from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/listar-precio-producto/agregar-precio/agregar-precio.component';

@NgModule({
  declarations: [
    ListarSolicitudesPersonalizadasComponent,
    GestionSolicitudPersonalizadaComponent,
    DetalleSolicitudPersonalizadaComponent,
    RegistrarEditarProductoSolicitudPerzonalizadaComponent,
    ListarDetalleProductoComponent,
    DetalleProductoDetalleComponent,
    ListarPrecioProductoComponent,
    ListarMaterialProductoComponent,
    ListarEntradasProductoComponent,
    AgregarEntradaPSComponent,
    AgregarMaterialComponent,
    AgregarPrecioComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [ListarSolicitudesPersonalizadasComponent, GestionSolicitudPersonalizadaComponent]
})
export class SolicitudesModule { }
