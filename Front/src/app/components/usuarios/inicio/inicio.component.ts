import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  PerfilUsuario
} from 'src/app/models/perfil-usuario';
import {Usuario} from 'src/app/models/usuario';
import {
  ConfiguracionService
} from 'src/app/services/configuracion.service';
import {
  UsuarioService
} from 'src/app/services/usuario.service';
import {ProductoService} from '../../../services/producto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(public configuracionService: ConfiguracionService,
              private router: Router, public usuarioService: UsuarioService,
              public productoService: ProductoService) {
  }

  perfilUsuario: PerfilUsuario;
  Micuenta = false;
  buscar: string;

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.usuarioService.inicioSesion = true;
    } else {
      this.usuarioService.inicioSesion = false;
    }
  }

  CambioMicuenta(): void {
    this.Micuenta = !this.Micuenta;
  }
  Buscar(): void{
    console.log(this.buscar);
    if (this.buscar.length != 0){
      this.productoService.BuscarProdutoBuscadorUSuario(this.buscar);
    }else{
      this.productoService.listarProducto();
    }

  }
}
