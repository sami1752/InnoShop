import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionReportesComponent } from './gestion-reportes/gestion-reportes.component';
import { ReportesSPComponent } from './gestion-reportes/reportes-sp/reportes-sp.component';
import { ReportesMComponent } from './gestion-reportes/reportes-m/reportes-m.component';
import { ReportesVComponent } from './gestion-reportes/reportes-v/reportes-v.component';



@NgModule({
  declarations: [
    GestionReportesComponent,
    ReportesSPComponent,
    ReportesMComponent,
    ReportesVComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReportesModule { }
