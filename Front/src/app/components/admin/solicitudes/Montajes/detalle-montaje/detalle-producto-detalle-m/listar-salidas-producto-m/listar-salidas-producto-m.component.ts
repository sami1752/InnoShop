import { Component, OnInit } from '@angular/core';
import {SolicitudesPersonalizadasService} from '../../../../../../../services/solicitudes-personalizadas.service';
import {ProductoService} from '../../../../../../../services/producto.service';
import {VentasService} from '../../../../../../../services/ventas.service';

@Component({
  selector: 'app-listar-salidas-producto-m',
  templateUrl: './listar-salidas-producto-m.component.html',
  styleUrls: ['./listar-salidas-producto-m.component.css']
})
export class ListarSalidasProductoMComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public productoService: ProductoService,
              public ventasService: VentasService) {
  }
  ngOnInit(): void {
  }

}
