import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionReportesComponent } from './gestion-reportes/gestion-reportes.component';
import { ReportesSPComponent } from './gestion-reportes/reportes-sp/reportes-sp.component';
import { ReportesMComponent } from './gestion-reportes/reportes-m/reportes-m.component';
import { ReportesVComponent } from './gestion-reportes/reportes-v/reportes-v.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgxChartsModule} from "@swimlane/ngx-charts";



@NgModule({
  declarations: [
    GestionReportesComponent,
    ReportesSPComponent,
    ReportesMComponent,
    ReportesVComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    RouterModule,
    NgxChartsModule
  ]
})
export class ReportesModule { }
