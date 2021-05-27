import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ReporteSPM} from '../../../../../models/Reportes/reporte-spm';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../../services/configuracion.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reportes-m',
  templateUrl: './reportes-m.component.html',
  styleUrls: ['./reportes-m.component.css']
})
export class ReportesMComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ReporteE: ReporteSPM;

  constructor(private http: HttpClient,
              private configuracion: ConfiguracionService) {
  }

  downloadPDF(): void {
    alert('Generando Reporte');
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
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

    this.http.get(this.configuracion.rootURL + '/Reportes/Montajes/' +
      this.range.get('start').value.toJSON() + '/' + this.range.get('end').value.toJSON()).toPromise().then(res => {
      this.ReporteE = res as ReporteSPM;
    });
  }

  ngOnInit(): void {
    this.http.get(this.configuracion.rootURL +
      '/Reportes/Montajes/0001-01-01 00:00:00.0000000/0001-01-01 00:00:00.0000000').toPromise().then(res => {
      this.ReporteE = res as ReporteSPM;
    });
  }

}
