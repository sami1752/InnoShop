import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  constructor(public usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.listarUsuarios();
  }
  llenarFormularioUsuario(usuario:Usuario){
    this.usuarioService.formularioRegistroUsuario.patchValue(usuario);
  }

}
