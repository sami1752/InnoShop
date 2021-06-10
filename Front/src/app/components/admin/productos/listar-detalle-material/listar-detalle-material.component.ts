import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DetalleMaterialProducto} from 'src/app/models/detalle-material-producto';
import {ProductoService} from 'src/app/services/producto.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../services/configuracion.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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

  displayedColumns: string[] = ['IdDetalleMaterial', 'IdProducto',  'NombreMaterial', 'Opciones'];
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
    Swal.fire({
      title: '¿Está seguro de eliminar el material?',
      text: 'Se eliminara el material del producto',
      textClass: 'center',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminación material',
          'Se ha eliminado con éxito',
          'success'
        );
        this.productoService.EliminarDetalleMaterial(idDetalle).subscribe(
          res => {
            this.listarMateriales(this.productoService.detalleProducto.IdProducto);
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }

}
