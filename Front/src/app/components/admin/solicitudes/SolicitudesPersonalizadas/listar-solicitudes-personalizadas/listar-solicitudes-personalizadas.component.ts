import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {SolicitudesPersonalizadasService} from 'src/app/services/solicitudes-personalizadas.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SolicitudPersonalizada} from '../../../../../models/SolicitudesPersonalizadas/solicitud-personalizada';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../../services/configuracion.service';
import {SolicitudPersonalizadaCorta} from '../../../../../models/SolicitudesPersonalizadas/solicitud-personalizada-corta';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-listar-solicitudes-personalizadas',
  templateUrl: './listar-solicitudes-personalizadas.component.html',
  styleUrls: ['./listar-solicitudes-personalizadas.component.css']
})
export class ListarSolicitudesPersonalizadasComponent implements AfterViewInit {

  // displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  displayedColumns: string[] = ['IdSolicitudPersonalizada', 'Fecha', 'ValorTotal', 'Usuario', 'Estado'];
  // dataSource: MatTableDataSource<UserData>;
  dataSource: MatTableDataSource<SolicitudPersonalizadaCorta>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public usuarioService: UsuarioService,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    // this.solicitudesPersonalizadasService.ListarSolicitudPersonalizada();
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/SolicitudPersonalizada')
      .toPromise()
      .then(
        (res) => {
          this.dataSource = new MatTableDataSource(res as SolicitudPersonalizadaCorta[]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      );
    // console.log(this.solicitudesPersonalizadasService.listaSolicitudPersonalizada);
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // ngOnInit(): void {
  //   alert('hola');
  //   this.solicitudesPersonalizadasService.ListarSolicitudPersonalizada();
  //   console.log(this.solicitudesPersonalizadasService.listaSolicitudPersonalizada);
  // }

}

function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
