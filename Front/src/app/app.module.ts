import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{UsuariosModule}from './componentes/usuarios/usuarios.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificarUsuarioComponent } from './componentes/vistasAdmin/modificarUsuario/modificar-usuario/modificar-usuario.component';
import { ListaUsuariosComponent } from './componentes/vistasAdmin/listaUsuarios/lista-usuarios/lista-usuarios.component';
import { RegistroUsuarioComponent } from './componentes/vistasAdmin/registroUsuario/registro-usuario/registro-usuario.component';
import { DetalleUsuarioComponent } from './componentes/vistasAdmin/detalleUsuario/detalle-usuario/detalle-usuario.component';
import { VistasAdminComponent } from './componentes/vistasAdmin/vistas-admin.component';
import { InicioadminComponent } from './componentes/vistasAdmin/inicioadmin/inicioadmin.component';
import { UsuarioService } from './servicios/usuario.service';
import { ConfiguracionService } from './servicios/configuracion.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './autorizaciones/auth.interceptor';



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
