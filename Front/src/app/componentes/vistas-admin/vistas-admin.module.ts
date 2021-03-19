import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistasAdminComponent } from './vistas-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { InicioAdminComponent } from './inicio-admin/inicio-admin.component';
import { ListarUsuariosComponent } from './usuarios-admin/listar-usuarios/listar-usuarios.component';




@NgModule({
  declarations: [VistasAdminComponent, InicioAdminComponent, ListarUsuariosComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[VistasAdminComponent]
})
export class VistasAdminModule { }
