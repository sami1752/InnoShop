import {Component, OnInit} from '@angular/core';
import {DetalleMaterialProducto} from 'src/app/models/detalle-material-producto';
import {ProductoService} from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-detalle-material',
  templateUrl: './listar-detalle-material.component.html',
  styleUrls: ['./listar-detalle-material.component.css']
})
export class ListarDetalleMaterialComponent implements OnInit {

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
