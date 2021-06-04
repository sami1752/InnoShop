import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DetalleEntrada} from 'src/app/models/detalle-entrada';
import {Entrada} from 'src/app/models/entrada';
import {ProductoService} from 'src/app/services/producto.service';
import {MatTableDataSource} from '@angular/material/table';
import {ProductoTabla} from '../../../../../models/producto-tabla';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../../services/configuracion.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-listar-entradas',
  templateUrl: './listar-entradas.component.html',
  styleUrls: ['./listar-entradas.component.css']
})
export class ListarEntradasComponent implements AfterViewInit {

  displayedColumns: string[] = ['IdEntrada', 'Cantidad',  'IdProducto', 'IdUsuario', 'Fecha'];
  dataSource: MatTableDataSource<Entrada>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public productoService: ProductoService,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
    this.listarEntradas(this.productoService.detalleProducto.IdProducto);
  }

  public listarEntradas(idProducto): void {
    this.http.get(this.configuracion.rootURL + '/Productos/listarEntradas/' + idProducto)
      .toPromise()
      .then(
        (res) => {
          this.dataSource = new MatTableDataSource(res as Entrada[]);
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

}
