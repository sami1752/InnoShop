import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{UsuariosModule}from './componentes/usuarios/usuarios.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './app/vistasAdmin/inicio/inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent
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
