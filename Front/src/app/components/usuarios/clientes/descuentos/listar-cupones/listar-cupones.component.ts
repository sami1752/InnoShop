import { Component, OnInit } from '@angular/core';
import {DescuentosService} from '../../../../../services/descuentos.service';
import {UsuarioService} from '../../../../../services/usuario.service';
import {Descuento} from '../../../../../models/Descuentos/descuento';
import {CarritoDeComprasService} from '../../../../../services/carrito-de-compras.service';

@Component({
  selector: 'app-listar-cupones',
  templateUrl: './listar-cupones.component.html',
  styleUrls: ['./listar-cupones.component.css']
})
export class ListarCuponesComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor( public carritoDeComprasService: CarritoDeComprasService, public descuentosService: DescuentosService, public usuariosService: UsuarioService) { }

  ngOnInit(): void {
    this.usuariosService.obtenerPerfil().subscribe(
      (res: any) => {
        this.descuentosService.ListarCuponesDeCliente(res.Id);
      }
    );
  }

  // tslint:disable-next-line:typedef
  public usarDescuento(descuento: Descuento){
    this.descuentosService.descuentoEnVenta = descuento;
    this.carritoDeComprasService.carritoDeCompras.Valor =
      this.carritoDeComprasService.carritoDeCompras.Valor
      - (this.descuentosService.descuentoEnVenta.PorcentajeDescuento
      * this.carritoDeComprasService.carritoDeCompras.Valor / 100);
  }

}
