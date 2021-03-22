import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PerfilUsuario } from '../models/perfil-usuario';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class AutorizacionRutasGuard implements CanActivate {
  constructor(private router:Router, private usuarioService: UsuarioService){}
  perfilUsuario :PerfilUsuario
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(localStorage.getItem('token')!=null){
        this.usuarioService.obtenerPerfil().subscribe(
          res=> {
            this.perfilUsuario = <PerfilUsuario> res;
            if(this.perfilUsuario.IdRol == 1)
              this.router.navigate(['/Admin/inicioadmin']);
            else
            this.router.navigate(['/usuarios/inicio']);
          },
          err=>{
            console.log(err);
          }
        );
        return true;
    }else{
          this.router.navigate(['usuarios/login']);
          return true;
        }
    }

}
