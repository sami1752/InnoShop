import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  Usuario
} from 'src/app/models/usuario';
import {
  ConfiguracionService
} from 'src/app/services/configuracion.service';
import {
  UsuarioService
} from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.component.html',
  styleUrls: ['./modificar-datos.component.css']
})
export class ModificarDatosComponent implements OnInit {

  constructor(public usuarioService: UsuarioService,
              private router: Router,
              public configuracionService: ConfiguracionService,
              public toastr: ToastrService) {
  }


  usuario: Usuario;
  nombre = [];
  nombrecompleto = '';
  letra = '';

  ngOnInit(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.usuarioService.perfilUsuario = (res as Usuario);
        this.usuarioService.buscarUsuarioId(this.usuarioService.perfilUsuario.Id).subscribe(
          respuesta => {
            this.usuario = respuesta as Usuario;
            this.nombre = Array.from(this.usuarioService.perfilUsuario.Nombres);
            this.nombrecompleto = this.usuarioService.perfilUsuario.Nombres + ' ' + this.usuarioService.perfilUsuario.Apellidos;
            this.letra = this.nombre[0];
            this.usuarioService.formularioRegistroEdicionDatos.patchValue(this.usuario);
          },
          Error => {
            alert('Error');
          }
        );
      },
      err => {
        console.log(err);
        alert('error');
      }
    );
  }


  modificarDatosCuenta(): void {
    this.usuarioService.actualizacionUsuario().subscribe(
      (respuesta: any) => {
        if (respuesta.Succeeded) {
          this.router.navigateByUrl('usuarios/login');
          this.toastr.success('Se ha actualizado los datos exitosamente', 'Edición de tu cuenta');
        } else {
          respuesta.Errors.forEach(element => {
            switch (element.Code) {
              case 'DuplicateUserName':
                this.toastr.info('Usuario existente en la base de datos');
                break;
              default:
                this.toastr.error('Ha ocurrido un error');
                break;
            }
          });
        }
      });
  }

  eliminarCuenta(): void {

    this.usuarioService.obtenerPerfil().subscribe(
      (res: any) => {
        this.usuario = res;

        if (confirm('Esta seguro de desactivar su cuenta')) {
          this.usuarioService.eliminarUsuario(this.usuario).subscribe(
            (resp) => {
              {
                this.toastr.info('Se ha eliminado con éxito la cuenta');
                this.configuracionService.cerrarSesion();
              }
            },
            err => {
              this.toastr.error('Ha ocurrido un error');
            }
          );
        }
      },
      err => {
        this.toastr.error('Ha ocurrido un error');
      }
    );

  }


}
