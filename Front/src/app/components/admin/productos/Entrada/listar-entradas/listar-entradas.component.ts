import {Component, OnInit} from '@angular/core';
import {DetalleEntrada} from 'src/app/models/detalle-entrada';
import {Entrada} from 'src/app/models/entrada';
import {ProductoService} from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-entradas',
  templateUrl: './listar-entradas.component.html',
  styleUrls: ['./listar-entradas.component.css']
})
export class ListarEntradasComponent implements OnInit {

  constructor(public productoService: ProductoService) {
  }

  ngOnInit(): void {
    this.productoService.listarEntradas(this.productoService.detalleProducto.IdProducto);
  }

}
