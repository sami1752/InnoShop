import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {VentasService} from 'src/app/services/ventas.service';
import {MatTableDataSource} from '@angular/material/table';
import {UsuariosTabla} from '../../../../models/usuarios-tabla';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../services/configuracion.service';
import {VentasTabla} from '../../../../models/Ventas/ventas-tabla';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.css']
})
export class ListarVentasComponent implements AfterViewInit {


  displayedColumns: string[] = ['IdVenta', 'NombreUsuario',  'TotalIva', 'Total'];
  dataSource: MatTableDataSource<VentasTabla>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public ventasService: VentasService,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
    this.http
      .get(this.configuracion.rootURL + '/Ventas')
      .toPromise()
      .then(
        (res) => {
          this.dataSource = new MatTableDataSource(res as VentasTabla[]);
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

  detalleVenta(idVenta: number): any {
    this.ventasService.ListarDetalleVentasProductos(idVenta);
    this.ventasService.DetalleVenta(idVenta);
    this.ventasService.desplegarDetalle = !this.ventasService.desplegarDetalle;
  }

}
