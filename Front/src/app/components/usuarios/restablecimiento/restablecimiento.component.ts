import {Component, OnInit} from '@angular/core';
import {ConfiguracionService} from 'src/app/services/configuracion.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-restablecimiento',
  templateUrl: './restablecimiento.component.html',
  styleUrls: ['./restablecimiento.component.css']
})
export class RestablecimientoComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, public configuracion: ConfiguracionService, private router: Router) {
  }

  ngOnInit(): void {
  }

  restablecer(): void {

    this.usuarioService.enviarEmailRecuperacion().subscribe(
      (res: any) => {
        alert(res.mensaje);
      },
      (error: any) => {
        alert(error.error.mensaje);
      }
    );
  }
}
