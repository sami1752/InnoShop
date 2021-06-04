import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SolicitudesPersonalizadasService} from '../../../../../services/solicitudes-personalizadas.service';
import {UsuarioService} from '../../../../../services/usuario.service';
import {MatTableDataSource} from '@angular/material/table';
import {MontajesTabla} from '../../../../../models/SolicitudesPersonalizadas/montajes-tabla';
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
  selector: 'app-listar-montaje',
  templateUrl: './listar-montaje.component.html',
  styleUrls: ['./listar-montaje.component.css']
})
export class ListarMontajeComponent implements AfterViewInit {

  displayedColumns: string[] = ['IdMontaje', 'Fecha', 'Estado', 'Usuario', 'ValorTotal', 'Opciones'];
  dataSource: MatTableDataSource<MontajesTabla>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public usuarioService: UsuarioService,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
    this.listarMontajes();
  }
  listarMontajes(): void {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/Montajes')
      .toPromise()
      .then(
        (res) => {
          this.dataSource = new MatTableDataSource(res as MontajesTabla[]);
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
