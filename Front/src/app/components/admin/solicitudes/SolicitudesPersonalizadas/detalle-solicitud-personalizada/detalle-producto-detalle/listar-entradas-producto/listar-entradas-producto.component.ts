import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { SolicitudesPersonalizadasService } from 'src/app/services/solicitudes-personalizadas.service';

@Component({
  selector: 'app-listar-entradas-producto',
  templateUrl: './listar-entradas-producto.component.html',
  styleUrls: ['./listar-entradas-producto.component.css']
})
export class ListarEntradasProductoComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService :SolicitudesPersonalizadasService,public productoService:ProductoService) { }

  ngOnInit(): void {
  }

}
