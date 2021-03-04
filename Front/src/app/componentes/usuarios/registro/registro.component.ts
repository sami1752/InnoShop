import { Component, OnInit } from '@angular/core';
import {UsuarioService} from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) { }

  sw:number;

  ngOnInit(): void {
  }

  registro(){
    
    this.sw=0;
    
    this.usuarioService.registrarUsuario().subscribe( 
        
      (respuesta:any)=>{
        if(respuesta.Succeeded){
          this.usuarioService.formularioRegistroUsuario.reset();
          
          this.sw=1;
        }else{
          respuesta.Errors.forEach(element => {
            switch(element.Code){
              case 'DuplicateUserName':
                  alert("Correo duplicado");
                  this.sw=1;              
                break;
              case 'DuplicateEmail':
                  alert("correo duplicado");
                  this.sw=1;
              default:
                alert("error");
                break;
            }
          })
          
      }
    });
  }

}
