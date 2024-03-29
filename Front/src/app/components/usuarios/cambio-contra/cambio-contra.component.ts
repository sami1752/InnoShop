import {
  Component,
  OnInit
} from '@angular/core';
import {
  ConfiguracionService
} from 'src/app/services/configuracion.service';
import {
  UsuarioService
} from 'src/app/services/usuario.service';
import {
  Router
} from '@angular/router';
import {Usuario} from 'src/app/models/usuario';

@Component({
  selector: 'app-cambio-contra',
  templateUrl: './cambio-contra.component.html',
  styleUrls: ['./cambio-contra.component.css']
})
export class CambioContraComponent implements OnInit {
  constructor(public usuarioService: UsuarioService, public configuracion: ConfiguracionService, private router: Router) {
  }

  ngOnInit(): void {
  }

  cambio(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.usuarioService.cambioContrasena = this.usuarioService.formularioCambioContrasena.value;
        this.usuarioService.cambioContrasena.Email = (res as Usuario).Email;
        this.usuarioService.cambioContra().subscribe(
          (resp) => {
            console.log(res);
            alert('Cambio Exitoso');
            this.configuracion.cerrarSesion();
          },
          error => {
            alert('Error');
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }
}
