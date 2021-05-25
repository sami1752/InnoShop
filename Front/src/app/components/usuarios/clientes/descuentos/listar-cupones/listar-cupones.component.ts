import { Component, OnInit } from '@angular/core';
import {DescuentosService} from '../../../../../services/descuentos.service';
import {UsuarioService} from '../../../../../services/usuario.service';

@Component({
  selector: 'app-listar-cupones',
  templateUrl: './listar-cupones.component.html',
  styleUrls: ['./listar-cupones.component.css']
})
export class ListarCuponesComponent implements OnInit {

  constructor(public descuentosService: DescuentosService, public usuariosService: UsuarioService) { }

  ngOnInit(): void {
    this.usuariosService.obtenerPerfil().subscribe(
      (res: any) => {
        this.descuentosService.ListarCuponesDeCliente(res.Id);
      }
    );
  }

}
