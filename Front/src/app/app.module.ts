import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{UsuariosModule}from './componentes/usuarios/usuarios.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './app/vistasAdmin/inicio/inicio/inicio.component';
import { ModificarUsuarioComponent } from './componentes/vistasAdmin/modificarUsuario/modificar-usuario/modificar-usuario.component';
import { ListaUsuariosComponent } from './componentes/vistasAdmin/listaUsuarios/lista-usuarios/lista-usuarios.component';
import { RegistroUsuarioComponent } from './componentes/vistasAdmin/registroUsuario/registro-usuario/registro-usuario.component';
import { DetalleUsuarioComponent } from './componentes/vistasAdmin/detalleUsuario/detalle-usuario/detalle-usuario.component';
import { VistasAdminComponent } from './componentes/vistasAdmin/vistas-admin.component';
import { InicioadminComponent } from './componentes/vistasAdmin/inicioadmin/inicioadmin.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ModificarUsuarioComponent,
    ListaUsuariosComponent,
    RegistroUsuarioComponent,
    DetalleUsuarioComponent,
    VistasAdminComponent,
    InicioadminComponent,
    



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsuariosModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
