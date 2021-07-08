import {Component, OnInit} from '@angular/core';
import {VentasService} from '../../../../services/ventas.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-venta-completo',
  templateUrl: './detalle-venta-completo.component.html',
  styleUrls: ['./detalle-venta-completo.component.css']
})
export class DetalleVentaCompletoComponent implements OnInit {

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
    const doc = new jsPDF('p', 'pt', 'a2');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 20;
      const bufferY = 45;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 1 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_ReporteSolicitudesPersonalizadas.pdf`);
    });
  }

}
