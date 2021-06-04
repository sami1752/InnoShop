import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductoService} from 'src/app/services/producto.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../../services/configuracion.service';
import {Iva} from '../../../../../models/iva';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}


@Component({
  selector: 'app-listar-iva',
  templateUrl: './listar-iva.component.html',
  styleUrls: ['./listar-iva.component.css']
})
export class ListarIvaComponent implements AfterViewInit {

  displayedColumns: string[] = ['IdIva', 'Porcentaje',  'FechaInicio', 'FechaFin', 'IdUsuario'];
  dataSource: MatTableDataSource<Iva>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public productoService: ProductoService,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
    this.listarIva();
  }
  listarIva(): void {
    this.http.get(this.configuracion.rootURL + '/Productos/ListarIva')
      .toPromise()
      .then(
        (res) => {
          this.dataSource = new MatTableDataSource(res as Iva[]);
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
