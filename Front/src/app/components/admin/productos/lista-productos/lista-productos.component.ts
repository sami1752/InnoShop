import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Producto} from 'src/app/models/producto';
import {ProductoService} from 'src/app/services/producto.service';
import {MatTableDataSource} from '@angular/material/table';
import {SolicitudPersonalizadaCorta} from '../../../../models/SolicitudesPersonalizadas/solicitud-personalizada-corta';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../services/configuracion.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ProductoTabla} from '../../../../models/producto-tabla';
import { ToastrService } from 'ngx-toastr';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements AfterViewInit {

  displayedColumns: string[] = ['IdProducto', 'Nombre',  'Estado', 'NombreCategoria', 'Opciones'];
  dataSource: MatTableDataSource<ProductoTabla>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router,
              public productoService: ProductoService,
              private http: HttpClient,
              private configuracion: ConfiguracionService,
              public  toastr: ToastrService) {
    this.actualizarTablaProductos();
  }
    public actualizarTablaProductos(): void {
    this.http
      .get(this.configuracion.rootURL + '/Productos')
      .toPromise()
      .then(
        (res) => {
          this.dataSource = new MatTableDataSource(res as ProductoTabla[]);
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

  llenarFormularioProducto(producto: Producto): void {
    this.productoService.CampoPrecio = false;
    this.productoService.formularioRegistroProductos.patchValue(producto);
  }

  eliminarProducto(idProducto): void {
      this.productoService.buscarProducto(idProducto).subscribe(
        (res: Producto) => {
          this.productoService.eliminarProducto(res).subscribe(
            resp => {
              if (res.Estado){
                this.toastr.success('Se ha activado con éxito', 'Activación producto');
              }else{
                this.toastr.info('Se ha desactivado con éxito', 'Desactivación producto');
              }
              this.actualizarTablaProductos();
            },
            err => {
              alert('Error');
            }
          );
        }, err => { alert('Error'); }
      );
  }

  detalleProducto(id): void {
    this.productoService.desplegarDetalle
      = !this.productoService.desplegarDetalle;
    this.productoService.buscarProductoIdDetalle(id);
    this.productoService.listarPrecios(id);
    this.productoService.listarImagen(id);
    this.productoService.ListarDetalleMaterial(id);
    this.productoService.listarEntradas(id);
    this.productoService.listarIva();
  }

  tomarIdProducto(id): void {
    this.productoService.precio.IdProducto = id;
  }
}
