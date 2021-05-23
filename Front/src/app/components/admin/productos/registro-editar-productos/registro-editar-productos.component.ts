import {
  Component,
  OnInit
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

@Component({
  selector: 'app-registro-editar-productos',
  templateUrl: './registro-editar-productos.component.html',
  styleUrls: ['./registro-editar-productos.component.css']
})
export class RegistroEditarProductosComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private router: Router, public productoService: ProductoService, public configuracion: ConfiguracionService) {}

  ngOnInit(): void {
  }

  listaTiposPuerta = [{
      Tipo: "Bisagra"
    },
    {
      Tipo: "Deslizante"
    },
    {
      Tipo: "Otro"
    }

  ];

  decision = [{
      dec: "Si",
      boo: true
    },
    {
      dec: "No",
      boo: false
    },
  ];

  categoria = [{
      id: 6,
      nombre: "Categoria 1"
    },
    {
      id: 8,
      nombre: "Categoria 2"
    },
  ];

  registro() {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.productoService.producto = this.productoService.formularioRegistroProductos.value;
        this.productoService.producto.IdUsuario = (res as Usuario).Id
        this.productoService.producto.IdCategoria = 3;
        this.productoService.registrarProducto().subscribe(
          (respuesta: any) => {
            alert("Registro exitoso");
            this.productoService.desplegarDetalleMateriales=true;
            this.productoService.idProducto1 = respuesta.mensaje;
            this.productoService.formularioRegistroProductos.reset();
            this.productoService.listarProducto();
          }, error => {
            alert(error)
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }


  actualizacion() {

    this.productoService.actualizacionProducto().subscribe(
      (respuesta: any) => {
          this.productoService.formularioRegistroProductos.reset();
          alert("Actualizacion Exitosa")
          this.productoService.CampoPrecio = true;
          this.productoService.listarProducto();
          this.productoService.ListarDetalleMaterial(this.productoService.producto.IdProducto);
      }, error => {
        alert(error)
        console.log(error);
      });
  }

  onSubmit() {
    this.productoService.producto = this.productoService.formularioRegistroProductos.value;
    if (this.productoService.producto.IdProducto == null ||
      this.productoService.producto.IdProducto == 0) {
      this.registro();
      console.log(this.productoService.producto)
    } else
      this.actualizacion();
  }

}
