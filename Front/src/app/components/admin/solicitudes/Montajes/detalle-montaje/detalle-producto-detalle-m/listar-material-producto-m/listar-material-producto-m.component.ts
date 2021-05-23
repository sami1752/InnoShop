import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../../../../../../services/producto.service';
import {DetalleMaterialProducto} from '../../../../../../../models/detalle-material-producto';

@Component({
  selector: 'app-listar-material-producto-m',
  templateUrl: './listar-material-producto-m.component.html',
  styleUrls: ['./listar-material-producto-m.component.css']
})
export class ListarMaterialProductoMComponent implements OnInit {

  constructor(public productoService: ProductoService) {
  }

  ngOnInit(): void {
  }

  eliminarMaterial(detalle: DetalleMaterialProducto): void {
    if (confirm('¿Estás seguro de eliminar el material?')) {
      this.productoService.EliminarDetalleMaterial(detalle.IdDetalleMaterial).subscribe(
        res => {
          this.productoService.ListarDetalleMaterial(detalle.IdProducto);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
