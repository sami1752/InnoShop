import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) {
  }

  ngOnInit(): void {

  }

}
