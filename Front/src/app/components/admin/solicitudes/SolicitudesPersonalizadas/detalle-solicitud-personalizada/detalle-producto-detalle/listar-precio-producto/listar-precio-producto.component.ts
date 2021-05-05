import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-precio-producto',
  templateUrl: './listar-precio-producto.component.html',
  styleUrls: ['./listar-precio-producto.component.css']
})
export class ListarPrecioProductoComponent implements OnInit {

  constructor(public productoService:ProductoService) { }

  ngOnInit(): void {
  }

}
