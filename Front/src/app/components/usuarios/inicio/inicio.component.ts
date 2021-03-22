import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
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
  constructor(public configuracionService: ConfiguracionService, private router: Router, private usuarioService: UsuarioService) {}
  ngOnInit(): void {
  }
}
