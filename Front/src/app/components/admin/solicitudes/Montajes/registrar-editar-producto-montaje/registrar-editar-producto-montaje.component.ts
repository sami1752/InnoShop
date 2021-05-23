import { Component, OnInit } from '@angular/core';
import {SolicitudesPersonalizadasService} from '../../../../../services/solicitudes-personalizadas.service';
import {UsuarioService} from '../../../../../services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductoService} from '../../../../../services/producto.service';
import {ConfiguracionService} from '../../../../../services/configuracion.service';
import {Usuario} from '../../../../../models/usuario';

@Component({
  selector: 'app-registrar-editar-producto-montaje',
  templateUrl: './registrar-editar-producto-montaje.component.html',
  styleUrls: ['./registrar-editar-producto-montaje.component.css']
})
export class RegistrarEditarProductoMontajeComponent implements OnInit {

  constructor(
    public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
    public usuarioService: UsuarioService,
    private router: Router,
    public productoService: ProductoService,
    public configuracion: ConfiguracionService,
    private rutaActiva: ActivatedRoute
  ) {
  }

  id: number = this.rutaActiva.snapshot.params.IdMontaje;
  idProductoRegistrado: number;
  listaTiposPuerta = [
    {
      Tipo: 'Bisagra',
    },
    {
      Tipo: 'Deslizante',
    },
    {
      Tipo: 'Otro',
    },
  ];

  decision = [
    {
      dec: 'Si',
      boo: true,
    },
    {
      dec: 'No',
      boo: false,
    },
  ];

  ngOnInit(): void {
  }

  registro(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      (res) => {
        this.productoService.producto = this.productoService.formularioRegistroProductos.value;
        this.productoService.producto.IdUsuario = (res as Usuario).Id;
        this.productoService.producto.IdCategoria = 1;
        this.productoService.registrarProducto().subscribe(
          (respuesta: any) => {
            alert('Registro exitoso');
            this.productoService.formularioRegistroProductos.reset();
            this.solicitudesPersonalizadasService.DetallesProductosMontajes =
              this.solicitudesPersonalizadasService.formularioDetalleProductoMontajes.value;
            this.solicitudesPersonalizadasService.DetallesProductosMontajes.IdDetallesProductosMontajes = 0;
            this.solicitudesPersonalizadasService.DetallesProductosMontajes.IdProducto = respuesta.mensaje;
            this.solicitudesPersonalizadasService.DetallesProductosMontajes.IdMontaje = this.id;
            this.solicitudesPersonalizadasService.DetallesProductosMontajes.IdUsuario = (res as Usuario).Id;
            this.solicitudesPersonalizadasService.AgregarDetallesProductosMontajes().subscribe(
              (r) => {
                this.solicitudesPersonalizadasService.ListaDetallesProductosMontajes(this.id);
                alert('Registro Detalle Exitoso');
                this.solicitudesPersonalizadasService.BuscarMontajes(this.id);
              },
              (e) => {
                alert('Registro Detalle Fallido');
              }
            );
          },
          (error) => {
            alert(error);
            console.log(error);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  actualizacion(): void {
    this.productoService.actualizacionProducto().subscribe(
      (respuesta: any) => {
        this.productoService.formularioRegistroProductos.reset();
        alert('Actualizacion Exitosa');
        this.productoService.CampoPrecio = true;
        this.productoService.listarProducto();
        this.productoService.ListarDetalleMaterial(
          this.productoService.producto.IdProducto
        );
      },
      (error) => {
        alert(error);
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    this.productoService.producto = this.productoService.formularioRegistroProductos.value;
    if (
      this.productoService.producto.IdProducto == null ||
      this.productoService.producto.IdProducto === 0
    ) {
      this.registro();
      console.log(this.productoService.producto);
    } else {
      this.actualizacion();
    }
  }

}
