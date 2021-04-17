import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuariosComponent} from './components/usuarios/usuarios.component';
import {RegistroComponent} from './components/usuarios/registro/registro.component';
import {LoginComponent} from './components/usuarios/login/login.component';
import { InicioComponent } from './components/usuarios/inicio/inicio.component';
import { AutorizacionRutasGuard } from './auth/autorizacion-rutas.guard';
import { RestablecimientoComponent } from './components/usuarios/restablecimiento/restablecimiento.component';
import { VerificacionComponent } from './components/usuarios/restablecimiento/verificacion/verificacion.component';
import { CambioContraComponent } from './components/usuarios/cambio-contra/cambio-contra.component';
import { ListaUsuariosComponent } from './components/admin/usuarios/lista-usuarios/lista-usuarios.component';
import { RegistroUsuarioComponent } from './components/admin/usuarios/registro-usuario/registro-usuario.component';
import { VistasAdminComponent } from './components/admin/vistas-admin.component';
import { ConfirmarEmailComponent } from './components/usuarios/confirmar-email/confirmar-email.component';
import { InicioadminComponent } from './components/admin/inicioadmin/inicioadmin.component';
import { GestionUsuarioComponent } from './components/admin/usuarios/gestion-usuario/gestion-usuario.component';
import { ModificarDatosComponent } from './components/usuarios/modificar-datos/modificar-datos.component';
import { ListarProductosComponent } from './components/usuarios/clientes/productos/listar-productos/listar-productos.component';
import { ListarDetalleCarritoComponent } from './components/usuarios/clientes/solicitudes/carrito-compras/listar-detalle-carrito/listar-detalle-carrito.component';
import { DetalleProductoClienteComponent } from './components/usuarios/clientes/productos/detalle-producto-cliente/detalle-producto-cliente.component';
import { ListaProductosComponent } from './components/admin/productos/lista-productos/lista-productos.component';
import { RegistrarSolicitudPErsonalizadaComponent } from './components/usuarios/clientes/solicitudes/personalizadas/registrar-solicitud-personalizada/registrar-solicitud-personalizada.component';


const routes: Routes = [
  {path:'', redirectTo:'usuarios/inicio',pathMatch:'full'},
  {path:'usuarios', component:UsuariosComponent,
    children: [
      {path:'registro',component:RegistroComponent},
      {path:'login', component:LoginComponent},
      {path:'restablecimientoContraseña', component:RestablecimientoComponent},
      {path:'RestablecerContrasena', component:VerificacionComponent},
      {path:'cambio', component:CambioContraComponent, canActivate:[AutorizacionRutasGuard]},
      {path:'inicio', component:ListarProductosComponent},
      {path:'confirmarEmail', component:ConfirmarEmailComponent},
      {path:'editarDatosCuenta', component:ModificarDatosComponent, canActivate:[AutorizacionRutasGuard]},
      {path:'MiCuenta', component:ModificarDatosComponent},
      {path:'Productos', component:ListarProductosComponent},
      {path:'Solicitud', component:RegistrarSolicitudPErsonalizadaComponent},
      {path:'carrito', component:ListarDetalleCarritoComponent, canActivate:[AutorizacionRutasGuard]}
    ]
  },

  {
    path:'productos', component:UsuariosComponent,
    children: [
      {path:'inicio',component:ListarProductosComponent},
      {path:'detalleProducto/:IdProducto', component: DetalleProductoClienteComponent}
    ]
  },

  {path:'solicitudes', component:UsuariosComponent,
    children: [
      {path:'carrito',component:ListarDetalleCarritoComponent},
  ]
  },


  {
    path:'Admin', component:VistasAdminComponent,
    children: [
      {path:'inicioadmin',component:InicioadminComponent, canActivate:[AutorizacionRutasGuard]},
      {path:'Usuarios', component:GestionUsuarioComponent, canActivate:[AutorizacionRutasGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
