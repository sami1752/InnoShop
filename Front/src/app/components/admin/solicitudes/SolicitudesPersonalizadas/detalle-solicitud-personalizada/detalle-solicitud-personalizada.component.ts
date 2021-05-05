import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleEstadosSolicitudPersonalizada } from 'src/app/models/SolicitudesPersonalizadas/detalle-estados-solicitud-personalizada';
import { Estados } from 'src/app/models/SolicitudesPersonalizadas/estados';
import { Usuario } from 'src/app/models/usuario';
import { ProductoService } from 'src/app/services/producto.service';
import { SolicitudesPersonalizadasService } from 'src/app/services/solicitudes-personalizadas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle-solicitud-personalizada',
  templateUrl: './detalle-solicitud-personalizada.component.html',
  styleUrls: ['./detalle-solicitud-personalizada.component.css']
})
export class DetalleSolicitudPersonalizadaComponent implements OnInit {

  constructor(public solicitudesPersonalizadasService :SolicitudesPersonalizadasService,
    public usuarioService : UsuarioService, private rutaActiva: ActivatedRoute,
    public productoService : ProductoService) { }
    id:number = this.rutaActiva.snapshot.params.IdSolicitud;
    
  ngOnInit(): void {
    this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id)
  }

  cancelar() {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
          this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada = this.solicitudesPersonalizadasService.formularioDetalleEstadoSolicitudPerzonalizada.value;
          this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdUsuario = (res as Usuario).Id
          this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdEstado = 5
          this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdSolicitudPersonalizada = this.id
          this.solicitudesPersonalizadasService.AgregarDetalleEstadosSolicitudPersonalizada().subscribe(
          (respuesta: any) => {
            this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id)
            alert("Registro Cancelacion exitosa");
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

  cotizar() {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
          this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada = this.solicitudesPersonalizadasService.formularioDetalleEstadoSolicitudPerzonalizada.value;
          this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdUsuario = (res as Usuario).Id
          this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdEstado = 10
          this.solicitudesPersonalizadasService.DetalleEstadosSolicitudPersonalizada.IdSolicitudPersonalizada = this.id
          this.solicitudesPersonalizadasService.AgregarDetalleEstadosSolicitudPersonalizada().subscribe(
          (respuesta: any) => {
            this.solicitudesPersonalizadasService.BuscarSolicitudPersonalizada(this.id)
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
}
