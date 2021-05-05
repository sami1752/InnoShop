import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarVentasComponent } from './listar-ventas/listar-ventas.component';
import { RegistrarVentaComponent } from './registrar-venta/registrar-venta.component';
import { RegistrarDetalleVentaComponent } from './registrar-detalle-venta/registrar-detalle-venta.component';
import {AppRoutingModule} from '../../../app-routing.module';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GestionVentasComponent } from './gestion-ventas/gestion-ventas.component';


@NgModule({
  declarations: [
    ListarVentasComponent,
    RegistrarVentaComponent,
    RegistrarDetalleVentaComponent,
    GestionVentasComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class VentasModule { }
