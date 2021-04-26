import { Component, OnInit } from '@angular/core';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
import { DescuentosService } from 'src/app/services/descuentos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ruleta-descuentos',
  templateUrl: './ruleta-descuentos.component.html',
  styleUrls: ['./ruleta-descuentos.component.css']
})
export class RuletaDescuentosComponent implements OnInit {

  constructor(public descuentosService:DescuentosService, public usuarioService:UsuarioService) { }

  perfilUsuario: PerfilUsuario = null;
  tablaCupones:boolean=false;

  ngOnInit(): void {
      if(localStorage.getItem('token')!=null){
        this.usuarioService.obtenerPerfil().subscribe(
          (res:any)=>{
            this.perfilUsuario = <PerfilUsuario> res;
            this.descuentosService.ListarCuponesDeCliente(this.perfilUsuario.Id)
          });
      }
     
      
      this.descuentosService.ListarPorcentajeDescuentos();
      this.descuentosService.ValorRuletaActual();
  }

  RegistrarCupon(){
    if(localStorage.getItem('token')!=null){
      if(this.perfilUsuario.Puntos>=30)
      {
        this.descuentosService.descuento.IdUsuario = this.perfilUsuario.Id
        this.descuentosService.RegistrarCuponDescuento().subscribe(
          res=>{
            alert(res)
          },err=>{
            alert("error al registrar cupon")
          }
        )
      }else{
        alert("No tiene los puntos necesarios para jugar")
      }
    }else alert("Inicie Sesión para poder adquirir descuento")
   
  }

}
