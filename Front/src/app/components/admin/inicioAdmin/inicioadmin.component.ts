import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  PerfilUsuario
} from 'src/app/models/perfil-usuario';
import {
  ConfiguracionService
} from 'src/app/services/configuracion.service';
import {
  UsuarioService
} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicioadmin',
  templateUrl: './inicioadmin.component.html',
  styleUrls: ['./inicioadmin.component.css']
})
export class InicioadminComponent implements OnInit {
  constructor(private router: Router, public usuarioService: UsuarioService, public configuracionService: ConfiguracionService) {
  }

  perfilUsuario: PerfilUsuario;
  Usuarios = false;
  Productos = false;
  datos = false;
  iva = false;
  entradas = false;

  ngOnInit(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.perfilUsuario = (res as PerfilUsuario);
        this.perfilUsuario = (res as PerfilUsuario);
        if (this.perfilUsuario.IdRol === 2) {
          this.router.navigate(['/usuarios/inicio']);
        }
        if (!this.perfilUsuario.Estado) {
          alert('Usuario Inactivo');
          this.configuracionService.cerrarSesion();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  GestionUsuario(): void {
    this.Usuarios = true;
    this.Productos = false;
    this.datos = false;
    this.iva = false;
    this.entradas = false;

  }

  cambioDatosP(): void {
    this.datos = true;
    this.Usuarios = false;
    this.Productos = false;
    this.iva = false;
    this.entradas = false;
  }

  GestionProductos(): void {
    this.Productos = true;
    this.Usuarios = false;
    this.datos = false;
    this.iva = false;
    this.entradas = false;
  }

  GestionIVA(): void {
    this.Productos = false;
    this.Usuarios = false;
    this.datos = false;
    this.iva = true;
    this.entradas = false;
  }

  GestionEntradas(): void {
    this.Productos = false;
    this.Usuarios = false;
    this.datos = false;
    this.iva = false;
    this.entradas = true;
  }

}
