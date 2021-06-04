import { Component, OnInit } from '@angular/core';
import {ReporteSPM} from '../../../../../models/Reportes/reporte-spm';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../../services/configuracion.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {DATA_ADVANCE_CHAR, DATA_PIE_CHAR, DATA_PIE_GRID_CHAR, ReporteVentas} from '../../../../../models/Reportes/reporte-ventas';
import {FormControl, FormGroup} from '@angular/forms';
import {IAdvanceChart} from '../../../../../models/Reportes/charts.interface';

@Component({
  selector: 'app-reportes-v',
  templateUrl: './reportes-v.component.html',
  styleUrls: ['./reportes-v.component.css']
})
export class ReportesVComponent implements OnInit {
  data: IAdvanceChart[] = [];
  datos: IAdvanceChart[] = [];
  Total: IAdvanceChart[] = [];
  view: [number, number] = [500, 300];
  view2: [number, number] = [400, 300];
  view3: [number, number ] = [700, 300];
  // options

  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  label = 'TOTAL MONTO VENTAS';
  legendPosition = 'right';
  legendTitle = '';

  colorScheme = {
    domain: ['#4B6789', '#6D4B89']
  };
  colorScheme2 = {
    domain: ['#4B6789', '#7aa3e5']
  };
  colorScheme3 = {
    domain: ['#4B6789', '#7aa3e5', '#DFDFDF']
  };
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private http: HttpClient,
              private configuracion: ConfiguracionService) {
    Object.assign(this, { DATA_ADVANCE_CHAR });
  }

  ReporteV: ReporteVentas;

  downloadPDF(): void {
    alert('Generando Reporte');
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a5');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_ReporteSolicitudesPersonalizadas.pdf`);
    });
  }

  Reporte(): void {
    this.http.get(this.configuracion.rootURL + '/Reportes/Ventas/' +
      this.range.get('start').value.toJSON() + '/' + this.range.get('end').value.toJSON()).toPromise().then(res => {
      this.data = [];
      this.datos = [];
      this.Total = [];
      this.ReporteV = res as ReporteVentas;
      const ventasproductos = {
        name: 'Ventas productos',
        value: this.ReporteV.MontoProd
      };
      const ventassolicitudes = {
        name: 'Ventas solicitudes',
        value: this.ReporteV.MontoPerso
      };
      const cantidadproductosv = {
        name: 'Productos ventas',
        value: this.ReporteV.CantProducto
      };
      const cantidadproductosp = {
        name: 'Productos solicitudes',
        value: this.ReporteV.CantProdPerso
      };
      const totalglobal = {
        name: 'Total global',
        value: this.ReporteV.TotalGlobal
      };
      const totaldesc = {
        name: 'Total descuentos',
        value: this.ReporteV.TotalDescuentos
      };
      const totalingresos = {
        name: 'Total ingresos',
        value: this.ReporteV.TotalIngresos
      };
      this.data = [...this.data, ventasproductos, ventassolicitudes];
      this.datos = [...this.datos, cantidadproductosv, cantidadproductosp];
      this.Total = [...this.Total, totalglobal, totaldesc, totalingresos];

    });
  }

  ngOnInit(): void {
    this.http.get(this.configuracion.rootURL +
      '/Reportes/Ventas/0001-01-01 00:00:00.0000000/0001-01-01 00:00:00.0000000').toPromise().then(res => {
      this.data = [];
      this.datos = [];
      this.Total = [];

      this.ReporteV = res as ReporteVentas;
      const ventasproductos = {
        name: 'Ventas productos',
        value: this.ReporteV.MontoProd
      };
      const ventassolicitudes = {
        name: 'Ventas solicitudes',
        value: this.ReporteV.MontoPerso
      };
      const cantidadproductosv = {
        name: 'Productos ventas',
        value: this.ReporteV.CantProducto
      };
      const cantidadproductosp = {
        name: 'Productos solicitudes',
        value: this.ReporteV.CantProdPerso
      };
      const totalglobal = {
        name: 'Total global',
        value: this.ReporteV.TotalGlobal
      };
      const totaldesc = {
        name: 'Total descuentos',
        value: this.ReporteV.TotalDescuentos
      };
      const totalingresos = {
        name: 'Total ingresos',
        value: this.ReporteV.TotalIngresos
      };
      this.data = [...this.data, ventasproductos, ventassolicitudes];
      this.datos = [...this.datos, cantidadproductosv, cantidadproductosp];
      this.Total = [...this.Total, totalglobal, totaldesc, totalingresos];

    });
    this.data = DATA_ADVANCE_CHAR;
    this.datos = DATA_PIE_GRID_CHAR;
    this.Total = DATA_PIE_CHAR;
  }

}
