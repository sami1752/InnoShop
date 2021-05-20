import {Component, OnInit} from '@angular/core';
import {SolicitudesPersonalizadasService} from '../../../../../../../services/solicitudes-personalizadas.service';
import {ProductoService} from '../../../../../../../services/producto.service';

@Component({
  selector: 'app-listar-precio-producto-m',
  templateUrl: './listar-precio-producto-m.component.html',
  styleUrls: ['./listar-precio-producto-m.component.css']
})
export class ListarPrecioProductoMComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService, public productoService: ProductoService) {
  }

  ngOnInit(): void {
  }

}
