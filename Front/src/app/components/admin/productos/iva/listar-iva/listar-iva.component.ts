import {Component, OnInit} from '@angular/core';
import {ProductoService} from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-iva',
  templateUrl: './listar-iva.component.html',
  styleUrls: ['./listar-iva.component.css']
})
export class ListarIvaComponent implements OnInit {

  constructor(public productoService: ProductoService) {
  }

  ngOnInit(): void {
    this.productoService.listarIva();
  }

}
