import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{UsuariosModule}from './components/usuarios/usuarios.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificarUsuarioComponent } from './components/admin/usuarios/modificar-usuario/modificar-usuario.component';
import { ListaUsuariosComponent } from './components/admin/usuarios/lista-usuarios/lista-usuarios.component';
import { RegistroUsuarioComponent } from './components/admin/usuarios/registro-usuario/registro-usuario.component';
import { DetalleUsuarioComponent } from './components/admin/usuarios/detalle-usuario/detalle-usuario.component';
import { VistasAdminComponent } from './components/admin/vistas-admin.component';
import { InicioadminComponent } from './components/admin/inicioadmin/inicioadmin.component';
import { UsuarioService } from './services/usuario.service';
import { ConfiguracionService } from './services/configuracion.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
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
  providers: [UsuarioService, ConfiguracionService,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
