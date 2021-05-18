import {Component, OnInit} from '@angular/core';
import {PerfilUsuario} from 'src/app/models/perfil-usuario';
import {DescuentosService} from 'src/app/services/descuentos.service';
import {UsuarioService} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-porcentaje',
  templateUrl: './registrar-porcentaje.component.html',
  styleUrls: ['./registrar-porcentaje.component.css']
})
export class RegistrarPorcentajeComponent implements OnInit {

  constructor(public descuentosService: DescuentosService, public usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
  }

  registro(): void {

    this.usuarioService.obtenerPerfil().subscribe(
      (resp: PerfilUsuario) => {
        this.descuentosService.idUsuario = resp.Id;
        this.descuentosService.RegistrarPorcentaje().subscribe(
          (res: any) => {
            this.descuentosService.ListarPorcentajeDescuentos();
          }, err => {
            alert('error');
          }
        );
      }
    );
  }

}
