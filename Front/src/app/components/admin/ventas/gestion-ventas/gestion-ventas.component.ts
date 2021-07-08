import {Component, OnInit} from '@angular/core';
import {VentasService} from 'src/app/services/ventas.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestion-ventas',
  templateUrl: './gestion-ventas.component.html',
  styleUrls: ['./gestion-ventas.component.css']
})
export class GestionVentasComponent implements OnInit {

  constructor(public ventasService: VentasService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }
  downloadPDF(): void {
    this.toastr.success('Descargando', 'Reporte');
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    console.log(DATA);
    const doc = new jsPDF('p', 'pt', 'a6');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 1;
      const bufferY = 45;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_ReporteSolicitudesPersonalizadas.pdf`);
    });
  }

}
