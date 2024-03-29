import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DetalleMaterialProducto} from 'src/app/models/detalle-material-producto';
import {ProductoService} from 'src/app/services/producto.service';
import {MatTableDataSource} from '@angular/material/table';
import {Precio} from '../../../../../../../models/precio';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../../../../services/configuracion.service';
import {Material} from '../../../../../../../models/material';
import {SolicitudesPersonalizadasService} from '../../../../../../../services/solicitudes-personalizadas.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-listar-material-producto',
  templateUrl: './listar-material-producto.component.html',
  styleUrls: ['./listar-material-producto.component.css']
})
export class ListarMaterialProductoComponent implements AfterViewInit {

  displayedColumns: string[] = ['IdDetalleMaterial', 'IdUsuario',  'NombreMaterial', 'Opciones'];
  dataSource: MatTableDataSource<DetalleMaterialProducto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public productoService: ProductoService,
              private http: HttpClient,
              private configuracion: ConfiguracionService,
              public solicitudesPersonalizadasService: SolicitudesPersonalizadasService) {
    this.listarMateriales(this.productoService.detalleProducto.IdProducto);
    this.productoService.listarMateriales();
  }
  public listarMateriales(idProducto): void {
    this.http.get(this.configuracion.rootURL + '/Productos/ListaDetalleMateriales/' + idProducto)
      .toPromise()
      .then(
        (res) => {
          this.dataSource = new MatTableDataSource(res as DetalleMaterialProducto[]);
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

  eliminarMaterial(idDetalle): void {
    if (confirm('¿Estás seguro de eliminar el material?')) {
      this.productoService.EliminarDetalleMaterial(idDetalle).subscribe(
        res => {
          alert('Se eliminó con exito');
          this.listarMateriales(this.productoService.detalleProducto.IdProducto);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
