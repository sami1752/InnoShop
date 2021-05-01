import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SolicitudesPersonalizadasService } from 'src/app/services/solicitudes-personalizadas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-editar-producto-solicitud-perzonalizada',
  templateUrl:
    './registrar-editar-producto-solicitud-perzonalizada.component.html',
  styleUrls: [
    './registrar-editar-producto-solicitud-perzonalizada.component.css',
  ],
})
export class RegistrarEditarProductoSolicitudPerzonalizadaComponent
  implements OnInit {
  constructor(
    public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
    public usuarioService: UsuarioService,
    private router: Router,
    public productoService: ProductoService,
    public configuracion: ConfiguracionService
  ) {}

  ngOnInit(): void {}

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
  registro() {
    this.usuarioService.obtenerPerfil().subscribe(
      (res) => {
        this.productoService.producto = this.productoService.formularioRegistroProductos.value;
        this.productoService.producto.IdUsuario = (res as Usuario).Id;
        this.productoService.producto.IdCategoria = 1;
        this.productoService.registrarProducto().subscribe(
          (respuesta: any) => {
            alert('Registro exitoso');
            alert(respuesta.mensaje);
            this.solicitudesPersonalizadasService.AgregarDetalleProductosSolicitud().subscribe(
              (respuesta)=>{

              },
              (err) => {
                
              }
            )
            this.productoService.formularioRegistroProductos.reset();
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

  actualizacion() {
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

  onSubmit() {
    this.productoService.producto = this.productoService.formularioRegistroProductos.value;
    if (
      this.productoService.producto.IdProducto == null ||
      this.productoService.producto.IdProducto == 0
    ) {
      this.registro();
      console.log(this.productoService.producto);
    } else this.actualizacion();
  }
}
