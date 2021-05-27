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
import { HistorialComprasComponent } from 'src/app/components/usuarios/clientes/solicitudes/gestion-compras/historial-compras/historial-compras.component';
import { GestionComprasComponent } from 'src/app/components/usuarios/clientes/solicitudes/gestion-compras/gestion-compras.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ListarVentasComponent,
    RegistrarVentaComponent,
    GestionVentasComponent,
    DetalleVentaProductoComponent,
    DetalleVentaCompletoComponent,
    FinalizarCompraComponent,
    HistorialComprasComponent,
    GestionComprasComponent
  ],
    imports: [
      CommonModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      NgxPayPalModule,
      ClientesModule,
      MatFormFieldModule,
      MatTableModule,
      MatPaginatorModule,
      DragDropModule,
      MatSortModule,
      MatInputModule,
      MatSelectModule
    ]
})
export class VentasModule {
}
