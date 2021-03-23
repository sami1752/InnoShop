import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuariosComponent} from './components/usuarios/usuarios.component';
import {RegistroComponent} from './components/usuarios/registro/registro.component';
import {LoginComponent} from './components/usuarios/login/login.component';
import { InicioComponent } from './components/usuarios/inicio/inicio.component';
import { AutorizacionRutasGuard } from './auth/autorizacion-rutas.guard';
import { RestablecimientoComponent } from './components/usuarios/restablecimiento/restablecimiento.component';
import { VerificacionComponent } from './components/usuarios/restablecimiento/verificacion/verificacion.component';
import { CambioContraComponent } from './components/usuarios/cambio-contra/cambio-contra.component';
import { ListaUsuariosComponent } from './components/admin/usuarios/lista-usuarios/lista-usuarios.component';
import { RegistroUsuarioComponent } from './components/admin/usuarios/registro-usuario/registro-usuario.component';
import { VistasAdminComponent } from './components/admin/vistas-admin.component';
import { ConfirmarEmailComponent } from './components/usuarios/confirmar-email/confirmar-email.component';
import { InicioadminComponent } from './components/admin/inicioadmin/inicioadmin.component';
import { GestionUsuarioComponent } from './components/admin/usuarios/gestion-usuario/gestion-usuario.component';
import { ModificarDatosComponent } from './components/usuarios/modificar-datos/modificar-datos.component';


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
      {path:'confirmarEmail', component:ConfirmarEmailComponent},
      {path:'editarDatosCuenta', component:ModificarDatosComponent}
    ]
  },
  {
    path:'Admin', component:VistasAdminComponent,
    children: [
      {path:'registroUsuario', component:RegistroUsuarioComponent, canActivate:[AutorizacionRutasGuard]},
      {path:'inicioadmin',component:InicioadminComponent, canActivate:[AutorizacionRutasGuard]},
      {path:'listarUsuarios', component:ListaUsuariosComponent},
      {path:'Usuarios', component:GestionUsuarioComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
