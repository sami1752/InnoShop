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

@Component({
  selector: 'app-listar-solicitudes-personalizadas',
  templateUrl: './listar-solicitudes-personalizadas.component.html',
  styleUrls: ['./listar-solicitudes-personalizadas.component.css']
})
export class ListarSolicitudesPersonalizadasComponent implements AfterViewInit {


  displayedColumns: string[] = ['IdSolicitudPersonalizada', 'Fecha', 'ValorTotal', 'Usuario', 'Estado'];
  dataSource: MatTableDataSource<SolicitudPersonalizadaCorta>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public usuarioService: UsuarioService,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
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


