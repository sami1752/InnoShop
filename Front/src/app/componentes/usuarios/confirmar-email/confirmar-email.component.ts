import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-confirmar-email',
  templateUrl: './confirmar-email.component.html',
  styleUrls: ['./confirmar-email.component.css']
})
export class ConfirmarEmailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private usuarioService:UsuarioService) { }

  respuesta:string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuarioService.confirmarCorreo.id= params['id'],
      this.usuarioService.confirmarCorreo.token = params['token'];
    });
    
    

    this.usuarioService.activacionCorreo().subscribe(

      (resp:any)=>{
      if(resp.Succeeded){
        this.respuesta = "Su cuenta se ha activado con éxito";
      }else{
        this.respuesta = "Error de activación"
      }
    });


  }


}
