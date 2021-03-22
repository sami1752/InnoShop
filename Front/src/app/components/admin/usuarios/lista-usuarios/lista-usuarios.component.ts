import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  constructor(private router:Router, public usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.listarUsuarios();
  }
  llenarFormularioUsuario(usuario:Usuario){
    this.usuarioService.formularioRegistroUsuario.patchValue(usuario);
  }

}
