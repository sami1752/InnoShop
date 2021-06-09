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
        if (respuesta.Succeeded) {
          this.usuarioService.formularioRegistroUsuario.reset();
          this.toastr.success('Se ha registrado exitosamente');
          this.sw = 1;
        } else {
          respuesta.Errors.forEach(element => {
            switch (element.Code) {
              case 'DuplicateUserName':
                this.toastr.info('El usuario ya se encuentra registrado');
                this.sw = 1;
                break;
              default:
                this.toastr.error('Ha ocurrido un error');
                break;
            }
          });
        }
      });
  }
}
