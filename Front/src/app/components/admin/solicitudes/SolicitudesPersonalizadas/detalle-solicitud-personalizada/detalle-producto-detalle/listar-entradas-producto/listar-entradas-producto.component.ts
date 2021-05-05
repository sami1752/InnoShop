import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-entradas-producto',
  templateUrl: './listar-entradas-producto.component.html',
  styleUrls: ['./listar-entradas-producto.component.css']
})
export class ListarEntradasProductoComponent implements OnInit {

  constructor(public productoService:ProductoService) { }

  ngOnInit(): void {
  }

}
