import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-contra',
  templateUrl: './cambio-contra.component.html',
  styleUrls: ['./cambio-contra.component.css']
})
export class CambioContraComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, public configuracion:ConfiguracionService,private router:Router) { }

  ngOnInit(): void {
  }

  cambio(){

    this.usuarioService.cambioContra().subscribe(
      (res)=>{
        console.log(res);
        alert("Cambio Exitoso");

        this.configuracion.cerrarSesion();
        
      },
      error =>{

          alert("Error");
        

      }
    )



  }

}
