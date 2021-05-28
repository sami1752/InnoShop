import {Component, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsuariosComponent} from './components/usuarios/usuarios.component';
import {RegistroComponent} from './components/usuarios/registro/registro.component';
import {LoginComponent} from './components/usuarios/login/login.component';
import {InicioComponent} from './components/usuarios/inicio/inicio.component';
import {AutorizacionRutasGuard} from './auth/autorizacion-rutas.guard';
import {RestablecimientoComponent} from './components/usuarios/restablecimiento/restablecimiento.component';
import {VerificacionComponent} from './components/usuarios/restablecimiento/verificacion/verificacion.component';
import {CambioContraComponent} from './components/usuarios/cambio-contra/cambio-contra.component';
import {ListaUsuariosComponent} from './components/admin/usuarios/lista-usuarios/lista-usuarios.component';
import {RegistroUsuarioComponent} from './components/admin/usuarios/registro-usuario/registro-usuario.component';
import {VistasAdminComponent} from './components/admin/vistas-admin.component';
import {ConfirmarEmailComponent} from './components/usuarios/confirmar-email/confirmar-email.component';
import {InicioadminComponent} from './components/admin/inicioadmin/inicioadmin.component';
import {GestionUsuarioComponent} from './components/admin/usuarios/gestion-usuario/gestion-usuario.component';
import {ModificarDatosComponent} from './components/usuarios/modificar-datos/modificar-datos.component';
import {ListarProductosComponent} from './components/usuarios/clientes/productos/listar-productos/listar-productos.component';
import {ListarDetalleCarritoComponent} from './components/usuarios/clientes/solicitudes/carrito-compras/listar-detalle-carrito/listar-detalle-carrito.component';
import {DetalleProductoClienteComponent} from './components/usuarios/clientes/productos/detalle-producto-cliente/detalle-producto-cliente.component';
import {ListaProductosComponent} from './components/admin/productos/lista-productos/lista-productos.component';
import {RegistrarSolicitudPErsonalizadaComponent} from './components/usuarios/clientes/solicitudes/personalizadas/registrar-solicitud-personalizada/registrar-solicitud-personalizada.component';
import {GestionProductosComponent} from './components/admin/productos/gestion-productos/gestion-productos.component';
import {GestionIvaComponent} from './components/admin/productos/iva/gestion-iva/gestion-iva.component';
import {ListarMisSolicitudesPersonalizadasComponent} from './components/usuarios/clientes/solicitudes/personalizadas/listar-mis-solicitudes-personalizadas/listar-mis-solicitudes-personalizadas.component';
import {RegistrarMontajesComponent} from './components/usuarios/clientes/solicitudes/personalizadas/registrar-montajes/registrar-montajes.component';
import {ListarMisMontajesComponent} from './components/usuarios/clientes/solicitudes/personalizadas/listar-mis-montajes/listar-mis-montajes.component';
import {FinalizarCompraComponent} from './components/usuarios/clientes/solicitudes/carrito-compras/finalizar-compra/finalizar-compra.component';
import {ListarSolicitudesPersonalizadasComponent} from './components/admin/solicitudes/SolicitudesPersonalizadas/listar-solicitudes-personalizadas/listar-solicitudes-personalizadas.component';
import {GestionSolicitudPersonalizadaComponent} from './components/admin/solicitudes/SolicitudesPersonalizadas/gestion-solicitud-personalizada/gestion-solicitud-personalizada.component';
import {DetalleSolicitudPersonalizadaComponent} from './components/admin/solicitudes/SolicitudesPersonalizadas/detalle-solicitud-personalizada/detalle-solicitud-personalizada.component';
import {RuletaDescuentosComponent} from './components/usuarios/clientes/descuentos/ruleta-descuentos/ruleta-descuentos.component';
import {GestionRuletaComponent} from './components/admin/descuentos/gestion-ruleta/gestion-ruleta.component';
import {GestionVentasComponent} from './components/admin/ventas/gestion-ventas/gestion-ventas.component';
import {ListarDetalleProductoComponent} from './components/usuarios/clientes/solicitudes/personalizadas/detalle-sp/listar-detalle-producto/listar-detalle-producto.component';
import {DetalleSPComponent} from './components/usuarios/clientes/solicitudes/personalizadas/detalle-sp/detalle-sp.component';
import {EditarSolicitudComponent} from './components/admin/solicitudes/SolicitudesPersonalizadas/editar-solicitud/editar-solicitud.component';
import {RespuestasSolicitudComponent} from './components/admin/solicitudes/SolicitudesPersonalizadas/respuestas-solicitud/respuestas-solicitud.component';
import {DetalleMComponent} from './components/usuarios/clientes/solicitudes/personalizadas/detalle-m/detalle-m.component';
import {RespuestaMontajeComponent} from './components/admin/solicitudes/Montajes/respuesta-montaje/respuesta-montaje.component';
import {EditarMontajeComponent} from './components/admin/solicitudes/Montajes/editar-montaje/editar-montaje.component';
import {GestionMontajeComponent} from './components/admin/solicitudes/Montajes/gestion-montaje/gestion-montaje.component';
import {DetalleMontajeComponent} from './components/admin/solicitudes/Montajes/detalle-montaje/detalle-montaje.component';
import {ReportesSPComponent} from './components/admin/reportes/gestion-reportes/reportes-sp/reportes-sp.component';
import {ReportesMComponent} from './components/admin/reportes/gestion-reportes/reportes-m/reportes-m.component';
import {ReportesVComponent} from './components/admin/reportes/gestion-reportes/reportes-v/reportes-v.component';
import {GestionReportesComponent} from './components/admin/reportes/gestion-reportes/gestion-reportes.component';
import {HistorialComprasComponent} from './components/usuarios/clientes/solicitudes/gestion-compras/historial-compras/historial-compras.component';
import {GestionComprasComponent} from './components/usuarios/clientes/solicitudes/gestion-compras/gestion-compras.component';


const routes: Routes = [
  {path: '', redirectTo: 'usuarios/inicio', pathMatch: 'full'},
  {
    path: 'usuarios', component: UsuariosComponent,
    children: [
      {path: 'registro', component: RegistroComponent},
      {path: 'login', component: LoginComponent},
      {path: 'restablecimientoContraseña', component: RestablecimientoComponent},
      {path: 'RestablecerContrasena', component: VerificacionComponent},
      {path: 'cambiarMiContraseña', component: CambioContraComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'inicio', component: ListarProductosComponent},
      {path: 'confirmarEmail', component: ConfirmarEmailComponent},
      {path: 'MiCuenta', component: ModificarDatosComponent, canActivate: [AutorizacionRutasGuard]},
    ]
  },

  {
    path: 'productos', component: UsuariosComponent,
    children: [
      {path: 'inicio', component: ListarProductosComponent},
      {path: 'detalleProducto/:IdProducto', component: DetalleProductoClienteComponent}
    ]
  },
  {
    path: 'solicitudes', component: UsuariosComponent,
    children: [
      {path: 'carrito', component: ListarDetalleCarritoComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'Solicitud/:IdSolicitud', component: RegistrarSolicitudPErsonalizadaComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'MisSolicitudes', component: ListarMisSolicitudesPersonalizadasComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'Montajes/:IdMontaje', component: RegistrarMontajesComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'MisMontajes', component: ListarMisMontajesComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'carrito', component: ListarDetalleCarritoComponent},
      {path: 'finalizarCompra', component: FinalizarCompraComponent},
      {path: 'detalleSP/:IdSolicitud', component: DetalleSPComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'respuestasSP/:IdSolicitud', component: RespuestasSolicitudComponent},
      {path: 'detalleM/:IdMontaje', component: DetalleMComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'respuestasM/:IdMontaje', component: RespuestaMontajeComponent},
      {path: 'historialCompras', component: GestionComprasComponent}
    ]
  },

  {
    path: 'descuentos', component: UsuariosComponent,
    children: [
      {path: 'ruleta', component: RuletaDescuentosComponent},
    ]
  },

  {
    path: 'Admin', component: InicioadminComponent,
    children: [
      {path: 'inicioadmin', component: ReportesSPComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'Usuarios', component: GestionUsuarioComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'Productos', component: GestionProductosComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'Iva', component: GestionIvaComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'MiCuenta', component: ModificarDatosComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'cambiarMiContraseña', component: CambioContraComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'solicitudes', component: GestionSolicitudPersonalizadaComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'montajes', component: GestionMontajeComponent},
      {path: 'detalleSP/:IdSolicitud', component: DetalleSolicitudPersonalizadaComponent},
      {path: 'descuentos', component: GestionRuletaComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'ventas', component: GestionVentasComponent, canActivate: [AutorizacionRutasGuard]},
      {path: 'editarSP/:IdSolicitud', component: EditarSolicitudComponent},
      {path: 'respuestasSP/:IdSolicitud', component: RespuestasSolicitudComponent},
      {path: 'editarM/:IdMontaje', component: EditarMontajeComponent},
      {path: 'respuestasM/:IdMontaje', component: RespuestaMontajeComponent},
      {path: 'detalleM/:IdMontaje', component: DetalleMontajeComponent},
      {path: 'reportes', component: GestionReportesComponent, children: [
          {path: 'montajes', component: ReportesMComponent},
          {path: 'solicitudes', component: ReportesSPComponent},
          {path: 'ventas', component: ReportesVComponent}
        ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
