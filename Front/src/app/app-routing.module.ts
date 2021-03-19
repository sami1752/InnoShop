import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuariosComponent} from './componentes/usuarios/usuarios.component';
import {RegistroComponent} from './componentes/usuarios/registro/registro.component';
import{LoginComponent} from './componentes/usuarios/login/login.component';
import { InicioComponent } from './componentes/usuarios/inicio/inicio.component';
import { AutorizacionRutasGuard } from './autorizaciones/autorizacion-rutas.guard';
import { RestablecimientoComponent } from './componentes/usuarios/restablecimiento/restablecimiento.component';
import { VerificacionComponent } from './componentes/usuarios/restablecimiento/verificacion/verificacion.component';
import { CambioContraComponent } from './componentes/usuarios/cambio-contra/cambio-contra.component';
import { ConfirmarEmailComponent } from './componentes/usuarios/confirmar-email/confirmar-email.component';



const routes: Routes = [
  {path:'', redirectTo:'usuarios/login',pathMatch:'full'},
  {path:'usuarios', component:UsuariosComponent,
    children: [
      {path:'registro',component:RegistroComponent},
      {path:'login', component:LoginComponent},
      {path:'restablecimientoContraseña', component:RestablecimientoComponent},
      {path:'RestablecerContrasena', component:VerificacionComponent},
      {path:'cambio', component:CambioContraComponent, canActivate:[AutorizacionRutasGuard]},
      {path:'inicio', component:InicioComponent,  canActivate:[AutorizacionRutasGuard]},
      {path:'confirmarEmail', component:ConfirmarEmailComponent}
    ]
  }
  
];






@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
