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
import { ModificarUsuarioComponent } from './componentes/vistasAdmin/modificarUsuario/modificar-usuario/modificar-usuario.component';
import { ListaUsuariosComponent } from './componentes/vistasAdmin/listaUsuarios/lista-usuarios/lista-usuarios.component';
import { RegistroUsuarioComponent } from './componentes/vistasAdmin/registroUsuario/registro-usuario/registro-usuario.component';
import { DetalleUsuarioComponent } from './componentes/vistasAdmin/detalleUsuario/detalle-usuario/detalle-usuario.component';
import { VistasAdminComponent } from './componentes/vistasAdmin/vistas-admin.component';
//import { InicioadminComponent } from './componentes/vistasAdmin/inicioadmin/inicioadmin.component';

const routes: Routes = [
  {path:'', redirectTo:'usuarios/login',pathMatch:'full'},
  {path:'usuarios', component:UsuariosComponent,
    children: [
      {path:'registro',component:RegistroComponent},
      {path:'login', component:LoginComponent},
      {path:'restablecimiento', component:RestablecimientoComponent},
      {path:'verificacion', component:VerificacionComponent},
      {path:'cambio', component:CambioContraComponent},
      {path:'inicio', component:InicioComponent,  canActivate:[AutorizacionRutasGuard]}
    ]
  },
  {
    path:'Admin', component:VistasAdminComponent,
    children: [
      {path:'registroUsuario', component:RegistroUsuarioComponent},
     // {path:'inicioadmin',component:InicioadminComponent},
      {path:'listarUsuarios', component:ListaUsuariosComponent},
      {path:'detalleUsuario', component:DetalleUsuarioComponent},
      {path:'modificarUsuario', component:ModificarUsuarioComponent},
    ]
  }
  
];






@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
