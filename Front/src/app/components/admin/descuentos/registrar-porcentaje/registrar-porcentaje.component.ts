import {Component, OnInit} from '@angular/core';
import {PerfilUsuario} from 'src/app/models/perfil-usuario';
import {DescuentosService} from 'src/app/services/descuentos.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {ListarPorcentajesComponent} from '../listar-porcentajes/listar-porcentajes.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registrar-porcentaje',
  templateUrl: './registrar-porcentaje.component.html',
  styleUrls: ['./registrar-porcentaje.component.css']
})
export class RegistrarPorcentajeComponent implements OnInit {

  constructor(public descuentosService: DescuentosService,
              public usuarioService: UsuarioService,
              public listaPorcen: ListarPorcentajesComponent,
              public toast: ToastrService) {
  }

  ngOnInit(): void {
  }

  registro(): void {

    this.usuarioService.obtenerPerfil().subscribe(
      (resp: PerfilUsuario) => {
        this.descuentosService.idUsuario = resp.Id;
        this.descuentosService.RegistrarPorcentaje().subscribe(
          (res: any) => {
            this.toast.success('Se registró el porcentaje  exitosamente', 'Registro porcentaje');
            this.listaPorcen.listarPorcen();
          }, err => {
            alert('error');
          }
        );
      }
    );
  }

}
