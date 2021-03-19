import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-inicioadmin',
  templateUrl: './inicioadmin.component.html',
  styleUrls: ['./inicioadmin.component.css']
})
export class InicioadminComponent implements OnInit {

  constructor(private router:Router, private usuarioService:UsuarioService) { }
  perfilUsuario;
  ngOnInit(){
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
  registro=false;
  lista=false;
  modificar=false;
  detalleUsu=false;

}
