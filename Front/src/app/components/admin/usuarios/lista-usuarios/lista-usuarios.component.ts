import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PerfilUsuario} from 'src/app/models/perfil-usuario';
import {Usuario} from 'src/app/models/usuario';
import {UsuarioService} from 'src/app/services/usuario.service';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../services/configuracion.service';
import {MatTableDataSource} from '@angular/material/table';
import {ProductoTabla} from '../../../../models/producto-tabla';
import {UsuariosTabla} from '../../../../models/usuarios-tabla';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements AfterViewInit {

  displayedColumns: string[] = ['Nombres', 'Email',  'Direccion', 'Telefono'];
  dataSource: MatTableDataSource<UsuariosTabla>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
              public usuarioService: UsuarioService,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
        this.http
          .get(this.configuracion.rootURL + '/Usuarios/ListaUsuarios')
          .toPromise()
          .then(
            (res) => {
              this.dataSource = new MatTableDataSource(res as UsuariosTabla[]);
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

  llenarFormularioUsuario(usuario: Usuario): void  {
    this.usuarioService.formularioRegistroUsuarioAdmin.patchValue(usuario);
    this.usuarioService.boton = 'Guardar';
  }

  eliminarUsuario(usuario: Usuario): void  {
    if (confirm('¿Estás seguro de desactivar el usuario?')) {
      this.usuarioService.eliminarUsuario(usuario).subscribe(
        res => {
          this.usuarioService.listarUsuarios();
          console.log(res);
        },
        err => {
          alert(err.code);
        }
      );
    }
  }

  detalleUsuario(id): void  {
    this.usuarioService.buscarUsuarioIdDetalle(id);
  }
}
