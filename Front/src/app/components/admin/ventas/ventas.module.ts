import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListarVentasComponent} from './listar-ventas/listar-ventas.component';
import {RegistrarVentaComponent} from './registrar-venta/registrar-venta.component';
import {AppRoutingModule} from '../../../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GestionVentasComponent} from './gestion-ventas/gestion-ventas.component';
import {DetalleVentaProductoComponent} from './detalle-venta-producto/detalle-venta-producto.component';
import {DetalleVentaCompletoComponent} from './detalle-venta-completo/detalle-venta-completo.component';
import {FinalizarCompraComponent} from '../../usuarios/clientes/solicitudes/carrito-compras/finalizar-compra/finalizar-compra.component';
import {NgxPayPalModule} from 'ngx-paypal';
import {ClientesModule} from '../../usuarios/clientes/clientes.module';
import { HistorialComprasComponent } from 'src/app/components/usuarios/clientes/solicitudes/historial-compras/historial-compras.component';

@NgModule({
  declarations: [
    ListarVentasComponent,
    RegistrarVentaComponent,
    GestionVentasComponent,
    DetalleVentaProductoComponent,
    DetalleVentaCompletoComponent,
    FinalizarCompraComponent,
    HistorialComprasComponent
  ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxPayPalModule,
        ClientesModule
    ]
})
export class VentasModule {
}
