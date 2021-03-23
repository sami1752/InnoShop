import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios.component';
import {AppRoutingModule} from '../../app-routing.module';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { RestablecimientoComponent } from './restablecimiento/restablecimiento.component';
import { VerificacionComponent } from './restablecimiento/verificacion/verificacion.component';
import { CambioContraComponent } from './cambio-contra/cambio-contra.component';
import { ConfirmarEmailComponent } from './confirmar-email/confirmar-email.component';
import { ModificarDatosComponent } from './modificar-datos/modificar-datos.component';




@NgModule({
  declarations: [RegistroComponent, LoginComponent, UsuariosComponent, InicioComponent, RestablecimientoComponent, VerificacionComponent, CambioContraComponent, ConfirmarEmailComponent, ModificarDatosComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  exports:[UsuariosComponent]
})
export class UsuariosModule { }
