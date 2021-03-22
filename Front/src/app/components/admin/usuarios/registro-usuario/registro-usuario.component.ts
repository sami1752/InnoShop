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
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  constructor(private router: Router, public usuarioService: UsuarioService, public configuracion: ConfiguracionService) {}
  /*  sw: number */

  ngOnInit(): void {}
  
  listaTiposDoc = [{
      Tipo: "Cédula de ciudadania"
    },
    {
      Tipo: "Tarjeta de identidad"
    },
    {
      Tipo: "Cédula de extranjerÍa"
    }
  ];

  listaSexo = [{
      Sexo: "Masculino"
    },
    {
      Sexo: "Femenino"
    },
    {
      Sexo: "Prefiero no decirlo"
    }
  ];
  registro() {
    this.usuarioService.uca = true;
    this.usuarioService.registrarUsuario().subscribe(
      (respuesta: any) => {
        alert(respuesta)
        if (respuesta.Succeeded) {
          this.usuarioService.formularioRegistroUsuarioAdmin.reset();
          alert("Registro Exitoso")
        } else
          respuesta.Errors.forEach(element => {
            switch (element.Code) {
              case 'DuplicateUserName':
                alert("Email Existente en la base de datos");
                this.usuarioService.listarUsuarios();
                break;
              default:
                alert("error");
                break;
            }
          })
      });
  }

  actualizacion() {
    this.usuarioService.actualizacionUsuario().subscribe(
      (respuesta: any) => {
        if (respuesta.Succeeded) {
          this.usuarioService.formularioRegistroUsuarioAdmin.reset();
          alert("Actualizacion Exitosa")
          this.usuarioService.listarUsuarios();
        } else
          respuesta.Errors.forEach(element => {
            switch (element.Code) {
              case 'DuplicateUserName':
                alert("Email Existente en la base de datos");
                break;
              default:
                alert("error");
                break;
            }
          })
      });
  }

  onSubmit() {
    this.usuarioService.usuario = this.usuarioService.formularioRegistroUsuarioAdmin.value;
    if (this.usuarioService.usuario.Id == null ||
      this.usuarioService.usuario.Id == "")
      this.registro();
    else
      this.actualizacion();
  }
}
