import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public usuarioService:UsuarioService, private router:Router) { }

  //si el token sigue vivo redirecciona a pagina con autorizacion de logueo
  ngOnInit(): void {
    if(localStorage.getItem('token')!=null)
      this.router.navigateByUrl('usuarios/inicio');

  }

  onSubmit(){
    this.usuarioService.loguin().subscribe(
      (res:any)=>{
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('usuarios/inicio');
        console.log(this.usuarioService.obtenerPerfil());
      },
      (error:any) =>{
        if(error.status == 400){
          alert(error.error.mensaje);
        }
      }
    )
  }

}
