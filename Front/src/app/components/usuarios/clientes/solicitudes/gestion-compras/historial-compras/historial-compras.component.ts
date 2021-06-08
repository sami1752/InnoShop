import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {VentasService} from '../../../../../../services/ventas.service';
import {UsuarioService} from '../../../../../../services/usuario.service';
import {MatTableDataSource} from '@angular/material/table';
import {VentasTabla} from '../../../../../../models/Ventas/ventas-tabla';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../../../services/configuracion.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements AfterViewInit {

  displayedColumns: string[] = ['IdVenta', 'TotalIva', 'Total'];
  dataSource: MatTableDataSource<VentasTabla>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public ventasService: VentasService,
              public usuariosService: UsuarioService,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
    this.usuariosService.obtenerPerfil().subscribe(
      (res: any) => {
        this.listarCompras(res.Id);
    }
    );
  }
  listarCompras(id): void {
    this.http
      .get(this.configuracion.rootURL + '/Ventas/compras/' + id)
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

  // tslint:disable-next-line:typedef
  detalleVenta(idVenta){
    this.ventasService.ListarDetalleVentasProductos(idVenta);
    this.ventasService.DetalleVenta(idVenta);
    this.ventasService.desplegarDetalle = true;
  }

}
