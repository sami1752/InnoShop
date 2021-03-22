import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  constructor(private router:Router,public usuarioService: UsuarioService, public configuracion: ConfiguracionService) { }
  sw: number

  ngOnInit(): void {
  }
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
  this.sw = 0;
  this.usuarioService.registrarUsuario().subscribe(
    (respuesta: any) => {
      if (respuesta.Succeeded) {
        this.usuarioService.formularioRegistroUsuario.reset();
        this.configuracion.router.navigateByUrl('usuarios/login');
        this.sw = 1;
      } else
        respuesta.Errors.forEach(element => {
          switch (element.Code) {
            case 'DuplicateUserName':
              alert("Correo Existente en la base de datos");
              this.sw = 1;
              break;
            default:
              alert("error");
              break;
          }
        })
    });
}

}
