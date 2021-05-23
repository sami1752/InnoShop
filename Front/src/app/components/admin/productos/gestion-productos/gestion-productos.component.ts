import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PerfilUsuario} from 'src/app/models/perfil-usuario';
import {ProductoService} from 'src/app/services/producto.service';
import {UsuarioService} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {

  constructor(private router: Router, public usuarioService: UsuarioService, public productoService: ProductoService) {
  }

  perfilUsuario: PerfilUsuario;

  ngOnInit(): void {

  }

}
