import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import {UsuarioService} from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, public configuracion:ConfiguracionService) { }

  sw:number;

  ngOnInit(): void {
  }

  listaTiposDoc =[
    {Tipo : "Cédula de ciudadania"},
    {Tipo : "Tarjeta de identidad"},
    {Tipo : "Cédula de extranjerÍa"}
  ];

  listaSexo=[
    {Sexo : "Masculino"},
    {Sexo : "Femenino"},
    {Sexo : "Prefiero no decirlo"}
  ];

  registro(){
    
    this.sw=0;
    
    this.usuarioService.registrarUsuario().subscribe( 
        
      (respuesta:any)=>{
        if(respuesta.Succeeded){
          this.usuarioService.formularioRegistroUsuario.reset();
          this.configuracion.router.navigateByUrl('usuarios/login');
          this.sw=1;
        }else{
          respuesta.Errors.forEach(element => {
            switch(element.Code){
              case 'DuplicateUserName':
                  alert("Correo Existente en la base de datos");
                  this.sw=1;              
                break;

              default:
                alert("error");
                break;
            }
          })
          
      }
    });
  }

}
