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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, public configuracion: ConfiguracionService,
              public toastr: ToastrService) {
  }

  sw: number;

  ngOnInit(): void {
  }

  registro(): void {
    this.sw = 0;
    this.usuarioService.registrarUsuario().subscribe(
      (respuesta: any) => {
          this.usuarioService.formularioRegistroUsuario.reset();
          this.toastr.success(respuesta.mensaje);
          this.sw = 1;
      }, err => {
        this.toastr.info(err.error.mensaje);
    });
  }
}
