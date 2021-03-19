import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{UsuariosModule}from './componentes/usuarios/usuarios.module';
import{VistasAdminModule}from './componentes/vistas-admin/vistas-admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsuariosModule,
    VistasAdminModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
