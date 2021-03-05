import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  constructor(public usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  verificacion(){

    this.usuarioService.verificacionCodigo().subscribe(
      (res:any)=>{
        if(res ==true){
          this.router.navigateByUrl('usuarios/cambio');
        }
      },
      error =>{
        if(error.status == 400){
          alert('Error codigo incorrecto');
          console.log(error);
        }
        else {
          console.log(error);
        }
      })
  }

}
