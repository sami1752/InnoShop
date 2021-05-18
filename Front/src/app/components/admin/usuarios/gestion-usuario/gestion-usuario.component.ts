import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PerfilUsuario} from 'src/app/models/perfil-usuario';
import {UsuarioService} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.css']
})
export class GestionUsuarioComponent implements OnInit {

  constructor(private router: Router, public usuarioService: UsuarioService) {
  }

  perfilUsuario: PerfilUsuario;

  ngOnInit(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.perfilUsuario = (res as PerfilUsuario);
        this.perfilUsuario = (res as PerfilUsuario);
        if (this.perfilUsuario.IdRol === 2) {
          this.router.navigate(['/usuarios/inicio']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
