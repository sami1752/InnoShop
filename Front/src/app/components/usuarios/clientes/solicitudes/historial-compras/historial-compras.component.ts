import { Component, OnInit } from '@angular/core';
import {VentasService} from '../../../../../services/ventas.service';
import {UsuarioService} from '../../../../../services/usuario.service';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {

  constructor(public ventasService: VentasService, public usuariosService: UsuarioService) { }

  ngOnInit(): void {
    this.usuariosService.obtenerPerfil().subscribe(
      (res: any) => {
        this.ventasService.listarVentasPorUsuario(res.Id);
      }
    );
  }

  // tslint:disable-next-line:typedef
  detalleVenta(idVenta){
    this.ventasService.ListarDetalleVentasProductos(idVenta);
    this.ventasService.DetalleVenta(idVenta);
    this.ventasService.desplegarDetalle = !this.ventasService.desplegarDetalle;
  }

}
