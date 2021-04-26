import { Component, OnInit } from '@angular/core';
import { DescuentosService } from 'src/app/services/descuentos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-porcentaje',
  templateUrl: './registrar-porcentaje.component.html',
  styleUrls: ['./registrar-porcentaje.component.css']
})
export class RegistrarPorcentajeComponent implements OnInit {

  constructor(public descuentosService:DescuentosService, public usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  registro(){

    this.usuarioService.obtenerPerfil().subscribe(
      (res:any)=>{
        this.descuentosService.RegistrarPorcentaje().subscribe(
          (res:any)=>{
            alert(res.mensaje)
            this.descuentosService.ListarPorcentajeDescuentos()
          },err=>{
            alert("error")
          }
        )
      }
    )
    
  }

}
