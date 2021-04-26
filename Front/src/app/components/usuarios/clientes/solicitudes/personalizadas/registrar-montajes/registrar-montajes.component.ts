import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { SolicitudesPersonalizadasService } from 'src/app/services/solicitudes-personalizadas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-montajes',
  templateUrl: './registrar-montajes.component.html',
  styleUrls: ['./registrar-montajes.component.css']
})
export class RegistrarMontajesComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
    public usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  registrar(){
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.Montajes =
        this.solicitudesPersonalizadasService.formularioRegistroMontaje.value;
        this.solicitudesPersonalizadasService.Montajes.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.AgregarMontajes().subscribe(
          (respuesta: any) => {
            this.solicitudesPersonalizadasService.formularioRegistroMontaje.reset();
            alert("Exito")
          }, error => {
            alert(error)
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }

}
