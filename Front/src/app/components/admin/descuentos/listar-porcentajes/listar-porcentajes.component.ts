import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PorcentajesRuleta} from 'src/app/models/Descuentos/porcentajes-ruleta';
import {DescuentosService} from 'src/app/services/descuentos.service';
import {MatTableDataSource} from '@angular/material/table';
import {ValorRuleta} from '../../../../models/Descuentos/valor-ruleta';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../services/configuracion.service';
import { ToastrService } from 'ngx-toastr';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-listar-porcentajes',
  templateUrl: './listar-porcentajes.component.html',
  styleUrls: ['./listar-porcentajes.component.css']
})
export class ListarPorcentajesComponent implements AfterViewInit {

  displayedColumns: string[] = ['IdPorcentajeRuleta', 'Porcentaje',  'Estado', 'Opciones'];
  dataSource: MatTableDataSource<PorcentajesRuleta>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public descuentosService: DescuentosService,
              private http: HttpClient,
              private configuracion: ConfiguracionService,
              public toastr: ToastrService) {
    this.listarPorcen();
  }
  ngAfterViewInit(): void {
  }
  public listarPorcen(): void{
    this.http.get(this.configuracion.rootURL + '/Descuentos/Porcentajes').toPromise().then(
      (res) => {
        this.dataSource = new MatTableDataSource(res as PorcentajesRuleta[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editarPorcentaje(porcentaje: PorcentajesRuleta): void {
    this.descuentosService.EditarPorcentaje(porcentaje).subscribe(
      (res: any) => {
        if (porcentaje.Estado){
          this.toastr.success('Se ha activado con éxito', 'Activación porcentaje');
        }else{
          this.toastr.info('Se ha desactivado con éxito', 'Desactivación porcentaje');
        }
        this.descuentosService.ListarPorcentajeDescuentos();
      }, err => {
      }
    );
  }

}
