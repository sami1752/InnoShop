import {
  Component,
  OnInit, ViewChild
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  Usuario
} from 'src/app/models/usuario';
import {
  ConfiguracionService
} from 'src/app/services/configuracion.service';
import {
  ProductoService
} from 'src/app/services/producto.service';
import {
  UsuarioService
} from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import {ListaProductosComponent} from '../lista-productos/lista-productos.component';
import {window} from 'rxjs/operators';

@Component({
  selector: 'app-registro-editar-productos',
  templateUrl: './registro-editar-productos.component.html',
  styleUrls: ['./registro-editar-productos.component.css']
})
export class RegistroEditarProductosComponent implements OnInit {
  constructor(public usuarioService: UsuarioService, private router: Router,
              public productoService: ProductoService,
              public configuracion: ConfiguracionService,
              private toastr: ToastrService) {
  }
  listaTiposPuerta = [{
    Tipo: 'Bisagra'
  },
    {
      Tipo: 'Deslizante'
    },
    {
      Tipo: 'Otro'
    }

  ];

  decision = [{
    dec: 'Si',
    boo: true
  },
    {
      dec: 'No',
      boo: false
    },
  ];

  categoria = [{
    id: 6,
    nombre: 'Categoria 1'
  },
    {
      id: 8,
      nombre: 'Categoria 2'
    },
  ];

  ngOnInit(): void {
  }

  registro(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.productoService.producto = this.productoService.formularioRegistroProductos.value;
        this.productoService.producto.IdUsuario = (res as Usuario).Id;
        this.productoService.producto.IdCategoria = 2;
        this.productoService.registrarProducto().subscribe(
          (respuesta: any) => {
            this.toastr.success('Registro exitoso');
            document.location.reload();
            this.productoService.formularioRegistroProductos.reset();
          }, error => {
            this.toastr.error('Ha ocurrido un error');
          });
      },
      err => {
        console.log(err);
      }
    );
  }


  actualizacion(): void {

    this.productoService.actualizacionProducto().subscribe(
      (respuesta: any) => {
        this.productoService.formularioRegistroProductos.reset();
        this.toastr.success('Registro exitoso');
        this.productoService.CampoPrecio = true;
        this.productoService.listarProducto();
        document.location.reload();
      }, error => {
        this.toastr.error('Ha ocurrido un error');
      });
  }

  onSubmit(): void {
    this.productoService.producto = this.productoService.formularioRegistroProductos.value;
    if (this.productoService.producto.IdProducto == null ||
      this.productoService.producto.IdProducto === 0) {
      this.registro();
      console.log(this.productoService.producto);
    } else {
      this.actualizacion();
    }
  }

}
