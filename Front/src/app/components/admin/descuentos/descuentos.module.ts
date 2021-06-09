import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListarPorcentajesComponent} from 'src/app/components/admin/descuentos/listar-porcentajes/listar-porcentajes.component';
import {GestionRuletaComponent} from 'src/app/components/admin/descuentos/gestion-ruleta/gestion-ruleta.component';
import {RegistrarPorcentajeComponent} from 'src/app/components/admin/descuentos/registrar-porcentaje/registrar-porcentaje.component';
import {ListarValorRuletaComponent} from 'src/app/components/admin/descuentos/listar-valor-ruleta/listar-valor-ruleta.component';
import {RegistrarValorRuletaComponent} from 'src/app/components/admin/descuentos/registrar-valor-ruleta/registrar-valor-ruleta.component';
import {AppRoutingModule} from '../../../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    DragDropModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: 2000,
      easing: 'swing'
    })
  ],
  exports: [GestionRuletaComponent]
})
export class DescuentosModule {
}
