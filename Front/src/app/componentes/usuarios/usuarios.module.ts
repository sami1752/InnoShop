import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';



@NgModule({
  declarations: [UsuariosComponent, LoginComponent, RegistroComponent],
  imports: [
    CommonModule
  ]
})
export class UsuariosModule { }
