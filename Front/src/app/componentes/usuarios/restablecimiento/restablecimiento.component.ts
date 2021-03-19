import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecimiento',
  templateUrl: './restablecimiento.component.html',
  styleUrls: ['./restablecimiento.component.css']
})
export class RestablecimientoComponent implements OnInit {

  constructor(public usuarioService:UsuarioService, public configuracion:ConfiguracionService, private router:Router) { }

  ngOnInit(): void {
  }

  restablecer(){

    this.usuarioService.restablecimientoContrasena().subscribe(
      (res:any)=>{
        if(res.status ==200){
          alert(res);
        }
      },
      error =>{
        if(error.status == 400){
          this.router.navigateByUrl('usuarios/verificacion');
        }else{
          alert("Error");
        }

      })
  }
}
