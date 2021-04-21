import { Component, OnInit } from '@angular/core';
import { CarritoDeComprasService } from 'src/app/services/carrito-de-compras.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css']
})
export class FinalizarCompraComponent implements OnInit {

  constructor(public carritoDeComprasService:CarritoDeComprasService, public usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      (res:any)=>{
        this.carritoDeComprasService.CarritoDeComprasUsuario(res.Id)
      },err=>{}
    )
  }

}
