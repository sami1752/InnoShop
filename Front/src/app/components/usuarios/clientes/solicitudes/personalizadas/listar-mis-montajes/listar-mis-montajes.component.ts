import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { SolicitudesPersonalizadasService } from 'src/app/services/solicitudes-personalizadas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listar-mis-montajes',
  templateUrl: './listar-mis-montajes.component.html',
  styleUrls: ['./listar-mis-montajes.component.css']
})
export class ListarMisMontajesComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService :SolicitudesPersonalizadasService, 
    public usuarioService : UsuarioService) { }

  ngOnInit(): void {
      this.usuarioService.obtenerPerfil().subscribe(
        res => {
          this.solicitudesPersonalizadasService.ListarMisMontajes((res as Usuario).Id);
        },
        err => {
          console.log(err);
        }
      );
  }

}
