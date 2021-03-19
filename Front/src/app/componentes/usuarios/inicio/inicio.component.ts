import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(public configuracionService:ConfiguracionService, private router:Router, private usuarioService:UsuarioService) { }


  perfilUsuario;
  ngOnInit(){
    console.log(localStorage.getItem('token'));
    
    this.usuarioService.obtenerPerfil().subscribe(
      res=> {
        this.perfilUsuario = res;
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
    console.log("----");
  }

}
