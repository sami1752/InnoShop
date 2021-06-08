import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Usuario} from 'src/app/models/usuario';
import {SolicitudesPersonalizadasService} from 'src/app/services/solicitudes-personalizadas.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {VentasTabla} from '../../../../../../models/Ventas/ventas-tabla';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../../../services/configuracion.service';
import {MontajesTabla} from '../../../../../../models/SolicitudesPersonalizadas/montajes-tabla';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-listar-mis-montajes',
  templateUrl: './listar-mis-montajes.component.html',
  styleUrls: ['./listar-mis-montajes.component.css']
})
export class ListarMisMontajesComponent implements AfterViewInit {
  displayedColumns: string[] = ['IdMontaje', 'Fecha', 'Estado', 'Direccion', 'ValorTotal', 'Opciones'];
  dataSource: MatTableDataSource<MontajesTabla>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public usuarioService: UsuarioService,
              private rutaActiva: ActivatedRoute,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
    this.usuarioService.obtenerPerfil().subscribe(
      (res: any) => {
        this.listarMontajes(res.Id);
      }
    );
  }
  id: number = this.rutaActiva.snapshot.params.IdMontaje;

  listarMontajes(id): void {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/MisMontajes/' + id)
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
