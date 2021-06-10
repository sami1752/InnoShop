import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DetalleMaterialProducto} from 'src/app/models/detalle-material-producto';
import {ProductoService} from 'src/app/services/producto.service';
import {MatTableDataSource} from '@angular/material/table';
import {Precio} from '../../../../models/precio';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../services/configuracion.service';
import {Material} from '../../../../models/material';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-listar-detalle-material',
  templateUrl: './listar-detalle-material.component.html',
  styleUrls: ['./listar-detalle-material.component.css']
})
export class ListarDetalleMaterialComponent implements AfterViewInit {

  displayedColumns: string[] = ['IdDetalleMaterial', 'Usuario',  'NombreMaterial', 'Opciones'];
  dataSource: MatTableDataSource<DetalleMaterialProducto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public productoService: ProductoService,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
    this.listarMateriales(this.productoService.detalleProducto.IdProducto);
    this.productoService.listarMateriales();
  }
  public listarMateriales(idProducto): void {
    this.http.get(this.configuracion.rootURL + '/Productos/ListaDetalleMateriales/' + idProducto)
      .toPromise()
      .then(
        (res) => {
          this.dataSource = new MatTableDataSource(res as DetalleMaterialProducto[]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      );
  }
  ngAfterViewInit(): void {
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarMaterial(idDetalle): void {
    if (confirm('¿Estás seguro de eliminar el material?')) {
      this.productoService.EliminarDetalleMaterial(idDetalle).subscribe(
        res => {
          alert('Se eliminó con exito');
          this.listarMateriales(this.productoService.detalleProducto.IdProducto);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
