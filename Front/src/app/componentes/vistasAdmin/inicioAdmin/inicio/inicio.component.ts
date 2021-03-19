import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css','../assets/plugins/fontawesome-free/css/all.min.css',
  '../assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css',
  '../assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css','../assets/plugins/jqvmap/jqvmap.min.css','../assets/dist/css/adminlte.min.css','../assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css',
  '../assets/plugins/daterangepicker/daterangepicker.css','../assets/plugins/summernote/summernote-bs4.min.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  registro=false;
  lista=false;
  modificar=false;
  detalleUsu=false;


}
