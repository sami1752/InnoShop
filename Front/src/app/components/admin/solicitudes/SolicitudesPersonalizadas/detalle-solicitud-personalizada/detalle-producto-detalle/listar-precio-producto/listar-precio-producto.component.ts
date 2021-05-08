import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { SolicitudesPersonalizadasService } from 'src/app/services/solicitudes-personalizadas.service';

@Component({
  selector: 'app-listar-precio-producto',
  templateUrl: './listar-precio-producto.component.html',
  styleUrls: ['./listar-precio-producto.component.css']
})
export class ListarPrecioProductoComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService :SolicitudesPersonalizadasService,public productoService:ProductoService) { }

  ngOnInit(): void {
  }

}
