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


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, public configuracion: ConfiguracionService) {
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
          alert('Registro exitoso');
          this.sw = 1;
        } else {
          respuesta.Errors.forEach(element => {
            switch (element.Code) {
              case 'DuplicateUserName':
                alert('Correo Existente en la base de datos');
                this.sw = 1;
                break;
              default:
                alert('error');
                break;
            }
          });
        }
      });
  }
}
