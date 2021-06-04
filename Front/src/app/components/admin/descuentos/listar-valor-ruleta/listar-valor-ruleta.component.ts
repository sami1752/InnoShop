import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DescuentosService} from 'src/app/services/descuentos.service';
import {MatTableDataSource} from '@angular/material/table';
import {UsuariosTabla} from '../../../../models/usuarios-tabla';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../services/configuracion.service';
import {ValorRuleta} from '../../../../models/Descuentos/valor-ruleta';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-listar-valor-ruleta',
  templateUrl: './listar-valor-ruleta.component.html',
  styleUrls: ['./listar-valor-ruleta.component.css']
})
export class ListarValorRuletaComponent implements AfterViewInit {

  displayedColumns: string[] = ['IdValorRuleta', 'ValorDeRuleta',  'FechaInicio', 'FechaFin'];
  dataSource: MatTableDataSource<ValorRuleta>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public descuentosService: DescuentosService,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
    this.listarValorRuleta();
  }
  public listarValorRuleta(): void{
    this.http
      .get(this.configuracion.rootURL + '/Descuentos/ValoresRuleta')
      .toPromise()
      .then(
        (res) => {
          this.dataSource = new MatTableDataSource(res as ValorRuleta[]);
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
