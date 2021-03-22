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
    console.log(this.usuarioService.listaUsuarios[0])
  }
  llenarFormularioUsuario(usuario:Usuario){
    this.usuarioService.formularioRegistroUsuario.patchValue(usuario);
  }

  eliminarUsuario(usuario:Usuario){
    if (confirm("¿Estás seguro de desactivar el usuario?")) {
      this.usuarioService.eliminarUsuario(usuario).subscribe(
        res=>{
          this.usuarioService.listarUsuarios();
          console.log(res);
        },
        err=>{
          alert(err.code);
        }
      );            
    } 
    
  }

}
