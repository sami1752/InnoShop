import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-precio',
  templateUrl: './listar-precio.component.html',
  styleUrls: ['./listar-precio.component.css']
})
export class ListarPrecioComponent implements OnInit {

  constructor(public productoService:ProductoService) { }

  ngOnInit(): void {
  }

}
