import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductoService} from 'src/app/services/producto.service';
import {MatTableDataSource} from '@angular/material/table';
import {Entrada} from '../../../../../models/entrada';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../../services/configuracion.service';
import {Precio} from '../../../../../models/precio';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-listar-precio',
  templateUrl: './listar-precio.component.html',
  styleUrls: ['./listar-precio.component.css']
})
export class ListarPrecioComponent implements AfterViewInit {

  displayedColumns: string[] = ['IdPrecioProducto', 'Precio',  'FechaInicio', 'FechaFin', 'IdUsuario'];
  dataSource: MatTableDataSource<Precio>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public productoService: ProductoService,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
    this.listarPrecios(this.productoService.detalleProducto.IdProducto);
  }

  public listarPrecios(idProducto): void {
    console.log(this.productoService.productosTabla);
    this.http.get(this.configuracion.rootURL + '/Productos/listaPrecioProducto/' + idProducto)
      .toPromise()
      .then(
        (res) => {
          this.dataSource = new MatTableDataSource(res as Precio[]);
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
