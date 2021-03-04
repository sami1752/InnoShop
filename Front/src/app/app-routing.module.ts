import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuariosComponent} from './componentes/usuarios/usuarios.component';
import {RegistroComponent} from './componentes/usuarios/registro/registro.component';
import{LoginComponent} from './componentes/usuarios/login/login.component';
import { InicioComponent } from './componentes/usuarios/inicio/inicio.component';
import { AutorizacionRutasGuard } from './autorizaciones/autorizacion-rutas.guard';


const routes: Routes = [
  {path:'', redirectTo:'usuarios/login',pathMatch:'full'},
  {path:'usuarios', component:UsuariosComponent,
    children: [
      {path:'registro',component:RegistroComponent},
      {path:'login', component:LoginComponent},
      {path:'inicio', component:InicioComponent,  canActivate:[AutorizacionRutasGuard]}
    ]
  }
  
];






@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
