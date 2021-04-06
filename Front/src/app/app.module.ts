import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {UsuariosModule}from './components/usuarios/usuarios.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaUsuariosComponent } from './components/admin/usuarios/lista-usuarios/lista-usuarios.component';
import { RegistroUsuarioComponent } from './components/admin/usuarios/registro-usuario/registro-usuario.component';
import { VistasAdminComponent } from './components/admin/vistas-admin.component';
import { InicioadminComponent } from './components/admin/inicioadmin/inicioadmin.component';
import { UsuarioService } from './services/usuario.service';
import { ConfiguracionService } from './services/configuracion.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { GestionUsuarioComponent } from './components/admin/usuarios/gestion-usuario/gestion-usuario.component';
import {DetalleUsuarioComponent} from './components/admin/usuarios/detalle-usuario/detalle-usuario.component';
import { GestionProductosComponent } from './components/admin/productos/gestion-productos/gestion-productos.component';
import { DetalleProductosComponent } from './components/admin/productos/detalle-productos/detalle-productos.component';
import { RegistroEditarProductosComponent } from './components/admin/productos/registro-editar-productos/registro-editar-productos.component';
import { ListaProductosComponent } from './components/admin/productos/lista-productos/lista-productos.component';



@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    RegistroUsuarioComponent,
    VistasAdminComponent,
    InicioadminComponent,
    GestionUsuarioComponent,
    DetalleUsuarioComponent,
    GestionProductosComponent,
    DetalleProductosComponent,
    RegistroEditarProductosComponent,
    ListaProductosComponent,
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
