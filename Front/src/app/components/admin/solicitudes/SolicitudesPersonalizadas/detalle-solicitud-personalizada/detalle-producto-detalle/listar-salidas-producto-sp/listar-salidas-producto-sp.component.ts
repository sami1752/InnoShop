import {Component, OnInit} from '@angular/core';
import {SolicitudesPersonalizadasService} from '../../../../../../../services/solicitudes-personalizadas.service';
import {ProductoService} from '../../../../../../../services/producto.service';
import {VentasService} from '../../../../../../../services/ventas.service';

@Component({
  selector: 'app-listar-salidas-producto-sp',
  templateUrl: './listar-salidas-producto-sp.component.html',
  styleUrls: ['./listar-salidas-producto-sp.component.css']
})
export class ListarSalidasProductoSPComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public productoService: ProductoService,
              public ventasService: VentasService) {
  }

  ngOnInit(): void {
  }

}
