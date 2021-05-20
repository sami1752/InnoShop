import { Component, OnInit } from '@angular/core';
import {SolicitudesPersonalizadasService} from '../../../../../../../services/solicitudes-personalizadas.service';
import {ProductoService} from '../../../../../../../services/producto.service';

@Component({
  selector: 'app-listar-entrada-producto-m',
  templateUrl: './listar-entrada-producto-m.component.html',
  styleUrls: ['./listar-entrada-producto-m.component.css']
})
export class ListarEntradaProductoMComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService, public productoService: ProductoService) {
  }

  ngOnInit(): void {
  }

}
