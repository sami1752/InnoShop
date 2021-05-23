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
import {Usuario} from 'src/app/models/usuario';
import {
  ConfiguracionService
} from 'src/app/services/configuracion.service';
import {
  UsuarioService
} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(public configuracionService: ConfiguracionService, private router: Router, public usuarioService: UsuarioService) {
  }

  perfilUsuario: PerfilUsuario;
  Micuenta = false;

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.usuarioService.inicioSesion = true;
    } else {
      this.usuarioService.inicioSesion = false;
    }
  }

  CambioMicuenta(): void {
    this.Micuenta = !this.Micuenta;
  }
}
