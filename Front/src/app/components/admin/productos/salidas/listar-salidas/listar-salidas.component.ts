import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Entrada} from '../../../../../models/entrada';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../../services/configuracion.service';
import {Salida} from '../../../../../models/salida';
import {ProductoService} from '../../../../../services/producto.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-listar-salidas',
  templateUrl: './listar-salidas.component.html',
  styleUrls: ['./listar-salidas.component.css']
})
export class ListarSalidasComponent implements AfterViewInit {

  displayedColumns: string[] = ['IdSalida', 'IdProducto', 'Cantidad', 'NombreUsuario', 'Fecha'];
  dataSource: MatTableDataSource<Salida>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public productoService: ProductoService,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
    this.listarSalidas(this.productoService.detalleProducto.IdProducto);
  }


  listarSalidas(idProducto): void {
    this.http.get(this.configuracion.rootURL + '/Ventas/Salidas/' + idProducto)
      .toPromise()
      .then(
        (res) => {
          this.dataSource = new MatTableDataSource(res as Salida[]);
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
