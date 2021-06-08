import {Component, OnInit} from '@angular/core';
import {ProductoService} from 'src/app/services/producto.service';
import {MatTableDataSource} from '@angular/material/table';
import {SolicitudesPersonalizadasService} from 'src/app/services/solicitudes-personalizadas.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
@Component({
  selector: 'app-listar-precio-producto',
  templateUrl: './listar-precio-producto.component.html',
  styleUrls: ['./listar-precio-producto.component.css']
})
export class ListarPrecioProductoComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService, public productoService: ProductoService) {
  }

  ngOnInit(): void {
  }

}
