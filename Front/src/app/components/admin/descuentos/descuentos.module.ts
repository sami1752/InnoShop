import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListarPorcentajesComponent} from 'src/app/components/admin/descuentos/listar-porcentajes/listar-porcentajes.component';
import {GestionRuletaComponent} from 'src/app/components/admin/descuentos/gestion-ruleta/gestion-ruleta.component';
import {RegistrarPorcentajeComponent} from 'src/app/components/admin/descuentos/registrar-porcentaje/registrar-porcentaje.component';
import {ListarValorRuletaComponent} from 'src/app/components/admin/descuentos/listar-valor-ruleta/listar-valor-ruleta.component';
import {RegistrarValorRuletaComponent} from 'src/app/components/admin/descuentos/registrar-valor-ruleta/registrar-valor-ruleta.component';
import {AppRoutingModule} from '../../../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ListarPorcentajesComponent,
    GestionRuletaComponent,
    RegistrarPorcentajeComponent,
    ListarValorRuletaComponent,
    RegistrarValorRuletaComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [GestionRuletaComponent]
})
export class DescuentosModule {
}
