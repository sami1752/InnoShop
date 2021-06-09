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

@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.component.html',
  styleUrls: ['./modificar-datos.component.css']
})
export class ModificarDatosComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private router: Router, public configuracionService: ConfiguracionService) {
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
          alert('Actualizacion Exitosa');
        } else {
          respuesta.Errors.forEach(element => {
            switch (element.Code) {
              case 'DuplicateUserName':
                alert('Email Existente en la base de datos');
                break;
              default:
                alert('error');
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
                alert('cliente eliminado con éxito');
                this.configuracionService.cerrarSesion();
              }
            },
            err => {
              alert('error');
            }
          );
        }
      },
      err => {
        alert('error');
      }
    );

  }


}
