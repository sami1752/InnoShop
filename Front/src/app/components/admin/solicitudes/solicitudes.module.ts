import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListarSolicitudesPersonalizadasComponent} from './SolicitudesPersonalizadas/listar-solicitudes-personalizadas/listar-solicitudes-personalizadas.component';
import {GestionSolicitudPersonalizadaComponent} from './SolicitudesPersonalizadas/gestion-solicitud-personalizada/gestion-solicitud-personalizada.component';
import {DetalleSolicitudPersonalizadaComponent} from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-solicitud-personalizada.component';
import {RegistrarEditarProductoSolicitudPerzonalizadaComponent} from './SolicitudesPersonalizadas/registrar-editar-producto-solicitud-perzonalizada/registrar-editar-producto-solicitud-perzonalizada.component';
import {AppRoutingModule} from '../../../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListarDetalleProductoComponent} from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/listar-detalle-producto/listar-detalle-producto.component';
import {DetalleProductoDetalleComponent} from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/detalle-producto-detalle.component';
import {ListarPrecioProductoComponent} from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/listar-precio-producto/listar-precio-producto.component';
import {ListarMaterialProductoComponent} from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/listar-material-producto/listar-material-producto.component';
import {ListarEntradasProductoComponent} from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/listar-entradas-producto/listar-entradas-producto.component';
import {AgregarEntradaPSComponent} from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/listar-entradas-producto/agregar-entrada-ps/agregar-entrada-ps.component';
import {AgregarMaterialComponent} from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/listar-material-producto/agregar-material/agregar-material.component';
import {AgregarPrecioComponent} from './SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-producto-detalle/listar-precio-producto/agregar-precio/agregar-precio.component';
import { EditarSolicitudComponent } from './SolicitudesPersonalizadas/editar-solicitud/editar-solicitud.component';
import { RespuestasSolicitudComponent } from './SolicitudesPersonalizadas/respuestas-solicitud/respuestas-solicitud.component';
import { DetalleMontajeComponent } from './Montajes/detalle-montaje/detalle-montaje.component';
import { EditarMontajeComponent } from './Montajes/editar-montaje/editar-montaje.component';
import { GestionMontajeComponent } from './Montajes/gestion-montaje/gestion-montaje.component';
import { ListarMontajeComponent } from './Montajes/listar-montaje/listar-montaje.component';
import { RegistrarEditarProductoMontajeComponent } from './Montajes/registrar-editar-producto-montaje/registrar-editar-producto-montaje.component';
import { RespuestaMontajeComponent } from './Montajes/respuesta-montaje/respuesta-montaje.component';
import { DetalleProductoDetalleMComponent } from './Montajes/detalle-montaje/detalle-producto-detalle-m/detalle-producto-detalle-m.component';
import { ListarDetalleProductoMComponent } from './Montajes/detalle-montaje/listar-detalle-producto-m/listar-detalle-producto-m.component';
import { ListarEntradaProductoMComponent } from './Montajes/detalle-montaje/detalle-producto-detalle-m/listar-entrada-producto-m/listar-entrada-producto-m.component';
import { ListarMaterialProductoMComponent } from './Montajes/detalle-montaje/detalle-producto-detalle-m/listar-material-producto-m/listar-material-producto-m.component';
import { ListarPrecioProductoMComponent } from './Montajes/detalle-montaje/detalle-producto-detalle-m/listar-precio-producto-m/listar-precio-producto-m.component';
import { AgregarEntradaMComponent } from './Montajes/detalle-montaje/detalle-producto-detalle-m/listar-entrada-producto-m/agregar-entrada-m/agregar-entrada-m.component';
import { AgregarMaterialMComponent } from './Montajes/detalle-montaje/detalle-producto-detalle-m/listar-material-producto-m/agregar-material-m/agregar-material-m.component';
import { AgregarPrecioMComponent } from './Montajes/detalle-montaje/detalle-producto-detalle-m/listar-precio-producto-m/agregar-precio-m/agregar-precio-m.component';

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
    EditarSolicitudComponent,
    RespuestasSolicitudComponent,
    DetalleMontajeComponent,
    EditarMontajeComponent,
    GestionMontajeComponent,
    ListarMontajeComponent,
    RegistrarEditarProductoMontajeComponent,
    RespuestaMontajeComponent,
    DetalleProductoDetalleMComponent,
    ListarDetalleProductoMComponent,
    ListarEntradaProductoMComponent,
    ListarMaterialProductoMComponent,
    ListarPrecioProductoMComponent,
    AgregarEntradaMComponent,
    AgregarMaterialMComponent,
    AgregarPrecioMComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [ListarSolicitudesPersonalizadasComponent, GestionSolicitudPersonalizadaComponent]
})
export class SolicitudesModule {
}
