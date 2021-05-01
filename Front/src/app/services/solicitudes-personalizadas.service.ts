import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DetalleEstadosMontajes } from '../models/SolicitudesPersonalizadas/detalle-estados-montajes';
import { DetalleEstadosProductosPersoanlizados } from '../models/SolicitudesPersonalizadas/detalle-estados-productos-persoanlizados';
import { DetalleEstadosSolicitudPersonalizada } from '../models/SolicitudesPersonalizadas/detalle-estados-solicitud-personalizada';
import { DetalleProductosSolicitud } from '../models/SolicitudesPersonalizadas/detalle-productos-solicitud';
import { DetallesMaterialesMontajes } from '../models/SolicitudesPersonalizadas/detalles-materiales-montajes';
import { DetallesMaterialesSolicitudesPersonalizadas } from '../models/SolicitudesPersonalizadas/detalles-materiales-solicitudes-personalizadas';
import { DetallesProductosMontajes } from '../models/SolicitudesPersonalizadas/detalles-productos-montajes';
import { Estados } from '../models/SolicitudesPersonalizadas/estados';
import { Montajes } from '../models/SolicitudesPersonalizadas/montajes';
import { PrecioMontajes } from '../models/SolicitudesPersonalizadas/precio-montajes';
import { RespuestasSolicitudesPersonalizadas } from '../models/SolicitudesPersonalizadas/respuestas-solicitudes-personalizadas';
import { SolicitudPersonalizada } from '../models/SolicitudesPersonalizadas/solicitud-personalizada';
import { ConfiguracionService } from './configuracion.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesPersonalizadasService {
  constructor(
    public usuarioService: UsuarioService,
    private http: HttpClient,
    private configuracion: ConfiguracionService,
    private formBuilder: FormBuilder
  ) {}
  DetalleEstadosMontajes: DetalleEstadosMontajes;
  listaDetalleEstadosMontajes: DetalleEstadosMontajes[];
  DetalleEstadosProductosPersoanlizados: DetalleEstadosProductosPersoanlizados;
  listaDetalleEstadosProductosPersoanlizados: DetalleEstadosProductosPersoanlizados[];
  DetalleEstadosSolicitudPersonalizada: DetalleEstadosSolicitudPersonalizada;
  listaDetalleEstadosSolicitudPersonalizada: DetalleEstadosSolicitudPersonalizada[];
  DetalleProductosSolicitud: DetalleProductosSolicitud;
  listaDetalleProductosSolicitud: DetalleProductosSolicitud[];
  DetallesMaterialesMontajes: DetallesMaterialesMontajes;
  listaDetallesMaterialesMontajes: DetallesMaterialesMontajes[];
  DetallesMaterialesSolicitudesPersonalizadas: DetallesMaterialesSolicitudesPersonalizadas;
  listaDetallesMaterialesSolicitudesPersonalizadas: DetallesMaterialesSolicitudesPersonalizadas[];
  DetallesProductosMontajes: DetallesProductosMontajes;
  listaDetallesProductosMontajes: DetallesProductosMontajes[];
  Estados: Estados;
  listaEstados: Estados[];
  Montajes: Montajes;
  listaMontajes: Montajes[];
  PrecioMontajes: PrecioMontajes;
  listaPrecioMontajes: PrecioMontajes[];
  RespuestasSolicitudesPersonalizadas: RespuestasSolicitudesPersonalizadas;
  listaRespuestasSolicitudesPersonalizadas: RespuestasSolicitudesPersonalizadas[];
  SolicitudPersonalizada: SolicitudPersonalizada;
  listaSolicitudPersonalizada: SolicitudPersonalizada[];
  fecha = new Date();
  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);
  SolicitudRechazada = true;
  SolicitudCortizando = false;

  formularioRegistroSolicitudPersonalizada = this.formBuilder.group({
    IdSolicitudPersonalizada: [],
    IdUsuario: [],
    Ancho: [],
    Fondo: [],
    Alto: [],
    Fecha: [],
    Descripcion: [],
    ValorTotal: [],
  });

  formularioRegistroMontaje = this.formBuilder.group({
    IdMontaje: [],
    IdUsuario: [],
    Ancho: [],
    Fondo: [],
    Alto: [],
    Fecha: [],
    Descripcion: [],
    ValorTotal: [],
    Direccion: [],
  });

  formularioDetalleEstadoSolicitudPerzonalizada = this.formBuilder.group({
    IdDetalleEstadoSolicitudPersonalizada: [],
    IdUsuario: [],
    IdEstado: [],
    FechaInicio: [],
    FechaFin: [],
    IdSolicitudPersonalizada: [],
  });

  ListarDetalleEstadosMontajes() {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/DetalleEstadosMontajes')
      .toPromise()
      .then(
        (res) =>
          (this.listaDetalleEstadosMontajes = res as DetalleEstadosMontajes[])
      );
  }

  ListaDetalleEstadosMontajes(id) {
    this.http
      .get(
        this.configuracion.rootURL + '/Solicitudes/DetalleEstadosMontajes/' + id
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaDetalleEstadosMontajes = res as DetalleEstadosMontajes[])
      );
  }

  AgregarDetalleEstadosMontajes() {
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/DetalleEstadosMontajes/',
      this.DetalleEstadosMontajes
    );
  }

  ListarDetalleEstadosProductosPersoanlizados() {
    this.http
      .get(
        this.configuracion.rootURL +
          '/Solicitudes/DetalleEstadosProductosPersoanlizados'
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaDetalleEstadosProductosPersoanlizados = res as DetalleEstadosProductosPersoanlizados[])
      );
  }

  ListaDetalleEstadosProductosPersoanlizados(id) {
    this.http
      .get(
        this.configuracion.rootURL +
          '/Solicitudes/DetalleEstadosProductosPersoanlizados/' +
          id
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaDetalleEstadosProductosPersoanlizados = res as DetalleEstadosProductosPersoanlizados[])
      );
  }

  AgregarDetalleEstadosProductosPersoanlizados() {
    return this.http.post(
      this.configuracion.rootURL +
        '/Solicitudes/DetalleEstadosProductosPersoanlizados/',
      this.DetalleEstadosProductosPersoanlizados
    );
  }

  ListarDetalleEstadosSolicitudPersonalizada() {
    this.http
      .get(
        this.configuracion.rootURL +
          '/Solicitudes/DetalleEstadosSolicitudPersonalizada'
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaDetalleEstadosSolicitudPersonalizada = res as DetalleEstadosSolicitudPersonalizada[])
      );
  }

  ListaDetalleEstadosSolicitudPersonalizada(id) {
    this.http
      .get(
        this.configuracion.rootURL +
          '/Solicitudes/DetalleEstadosSolicitudPersonalizada/' +
          id
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaDetalleEstadosSolicitudPersonalizada = res as DetalleEstadosSolicitudPersonalizada[])
      );
  }

  AgregarDetalleEstadosSolicitudPersonalizada() {
    this.DetalleEstadosSolicitudPersonalizada.FechaInicio = this.hoy.toISOString();
    this.DetalleEstadosSolicitudPersonalizada.FechaFin = '0001-01-01';
    this.DetalleEstadosSolicitudPersonalizada.IdDetalleEstadoSolicitudPersonalizada = 0;
    return this.http.post(
      this.configuracion.rootURL +
        '/Solicitudes/DetalleEstadosSolicitudPersonalizada/',
      this.DetalleEstadosSolicitudPersonalizada
    );
  }

  EliminarDetalleProductosSolicitud(id) {
    return this.http.delete(
      this.configuracion.rootURL +
        '/Solicitudes/DetalleProductosSolicitud/' +
        id
    );
  }

  ListarDetalleProductosSolicitud() {
    this.http
      .get(
        this.configuracion.rootURL + '/Solicitudes/DetalleProductosSolicitud'
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaDetalleProductosSolicitud = res as DetalleProductosSolicitud[])
      );
  }

  ListaDetalleProductosSolicitud(id) {
    this.http
      .get(
        this.configuracion.rootURL +
          '/Solicitudes/DetalleProductosSolicitud/' +
          id
      )
      .toPromise()
      .then((res) => {
        this.listaDetalleProductosSolicitud = res as DetalleProductosSolicitud[];
        console.log("hols")
        console.log(this.listaDetalleProductosSolicitud)
      });
  }

  AgregarDetalleProductosSolicitud() {
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/DetalleProductosSolicitud/',
      this.DetalleProductosSolicitud
    );
  }

  EliminarDetallesMaterialesMontajes(id) {
    return this.http.delete(
      this.configuracion.rootURL +
        '/Solicitudes/DetallesMaterialesMontajes/' +
        id
    );
  }

  ListarDetallesMaterialesMontajes() {
    this.http
      .get(
        this.configuracion.rootURL + '/Solicitudes/DetallesMaterialesMontajes'
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaDetallesMaterialesMontajes = res as DetallesMaterialesMontajes[])
      );
  }

  ListaDetallesMaterialesMontajes(id) {
    this.http
      .get(
        this.configuracion.rootURL +
          '/Solicitudes/DetallesMaterialesMontajes/' +
          id
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaDetallesMaterialesMontajes = res as DetallesMaterialesMontajes[])
      );
  }

  AgregarDetallesMaterialesMontajes() {
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/DetallesMaterialesMontajes/',
      this.DetallesMaterialesMontajes
    );
  }

  EliminarDetallesMaterialesSolicitudesPersonalizadas(id) {
    return this.http.delete(
      this.configuracion.rootURL +
        '/Solicitudes/DetallesMaterialesSolicitudesPersonalizadas/' +
        id
    );
  }

  ListarDetallesMaterialesSolicitudesPersonalizadas() {
    this.http
      .get(
        this.configuracion.rootURL +
          '/Solicitudes/DetallesMaterialesSolicitudesPersonalizadas'
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaDetallesMaterialesSolicitudesPersonalizadas = res as DetallesMaterialesSolicitudesPersonalizadas[])
      );
  }

  ListaDetallesMaterialesSolicitudesPersonalizadas(id) {
    this.http
      .get(
        this.configuracion.rootURL +
          '/Solicitudes/DetallesMaterialesSolicitudesPersonalizadas/' +
          id
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaDetallesMaterialesSolicitudesPersonalizadas = res as DetallesMaterialesSolicitudesPersonalizadas[])
      );
  }

  AgregarDetallesMaterialesSolicitudesPersonalizadas() {
    return this.http.post(
      this.configuracion.rootURL +
        '/Solicitudes/DetallesMaterialesSolicitudesPersonalizadas/',
      this.DetallesMaterialesSolicitudesPersonalizadas
    );
  }

  EliminarDetallesProductosMontajes(id) {
    return this.http.delete(
      this.configuracion.rootURL +
        '/Solicitudes/DetallesProductosMontajes/' +
        id
    );
  }

  ListarDetallesProductosMontajes() {
    this.http
      .get(
        this.configuracion.rootURL + '/Solicitudes/DetallesProductosMontajes'
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaDetallesProductosMontajes = res as DetallesProductosMontajes[])
      );
  }

  ListaDetallesProductosMontajes(id) {
    this.http
      .get(
        this.configuracion.rootURL +
          '/Solicitudes/DetallesProductosMontajes/' +
          id
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaDetallesProductosMontajes = res as DetallesProductosMontajes[])
      );
  }

  AgregarDetallesProductosMontajes() {
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/DetallesProductosMontajes/',
      this.DetallesProductosMontajes
    );
  }

  ListarMontajes() {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/Montajes')
      .toPromise()
      .then((res) => (this.listaMontajes = res as Montajes[]));
  }

  ListarMisMontajes(id) {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/MisMontajes/' + id)
      .toPromise()
      .then((res) => (this.listaMontajes = res as Montajes[]));
  }

  BuscarMontajes(id) {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/Montajes/' + id)
      .toPromise()
      .then((res) => (this.Montajes = res as Montajes));
  }

  AgregarMontajes() {
    this.Montajes.Fecha = this.hoy.toISOString();
    this.Montajes.ValorTotal = 0;
    this.Montajes.IdMontaje = 0;
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/Montajes/',
      this.Montajes
    );
  }

  EditarMontajes() {
    return this.http.put(
      this.configuracion.rootURL + '/Solicitudes/Montajes',
      this.Montajes
    );
  }

  ListarPrecioMontajes() {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/PrecioMontajes')
      .toPromise()
      .then((res) => (this.listaPrecioMontajes = res as PrecioMontajes[]));
  }

  ListaPrecioMontajes(id) {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/PrecioMontajes/' + id)
      .toPromise()
      .then((res) => (this.listaPrecioMontajes = res as PrecioMontajes[]));
  }

  AgregarPrecioMontajes() {
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/PrecioMontajes/',
      this.PrecioMontajes
    );
  }
  AgregarEstados() {
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/Estados/',
      this.Estados
    );
  }

  ListaRespuestasSolicitudesPersonalizadas(id) {
    this.http
      .get(
        this.configuracion.rootURL +
          '/Solicitudes/RespuestasSolicitudesPersonalizadas/' +
          id
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaRespuestasSolicitudesPersonalizadas = res as RespuestasSolicitudesPersonalizadas[])
      );
  }

  AgregarRespuestasSolicitudesPersonalizadas() {
    return this.http.post(
      this.configuracion.rootURL +
        '/Solicitudes/RespuestasSolicitudesPersonalizadas/',
      this.RespuestasSolicitudesPersonalizadas
    );
  }

  ListarSolicitudPersonalizada() {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/SolicitudPersonalizada')
      .toPromise()
      .then(
        (res) =>
          (this.listaSolicitudPersonalizada = res as SolicitudPersonalizada[])
      );
  }
  ListarMisSolicitudPersonalizada(id) {
    this.http
      .get(
        this.configuracion.rootURL +
          '/Solicitudes/MisSolicitudPersonalizada/' +
          id
      )
      .toPromise()
      .then(
        (res) =>
          (this.listaSolicitudPersonalizada = res as SolicitudPersonalizada[])
      );
  }

  BuscarSolicitudPersonalizada(id) {
    this.http
      .get(
        this.configuracion.rootURL + '/Solicitudes/SolicitudPersonalizada/' + id
      )
      .toPromise()
      .then((res) => {
        this.SolicitudPersonalizada = res as SolicitudPersonalizada;
        if (this.SolicitudPersonalizada.Estado == 'Rechazada')
          this.SolicitudRechazada = false;
        if (this.SolicitudPersonalizada.Estado == 'En proceso de cotizacion')
          this.SolicitudCortizando = true;

        this.formularioRegistroSolicitudPersonalizada.patchValue(
          this.SolicitudPersonalizada
        );
      });
  }

  AgregarSolicitudPersonalizada() {
    this.SolicitudPersonalizada.Fecha = this.hoy.toISOString();
    this.SolicitudPersonalizada.ValorTotal = 0;
    this.SolicitudPersonalizada.IdSolicitudPersonalizada = 0;
    console.log(this.SolicitudPersonalizada);
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/SolicitudPersonalizada/',
      this.SolicitudPersonalizada
    );
  }

  EditarSolicitudPersonalizada() {
    return this.http.put(
      this.configuracion.rootURL + '/Solicitudes/SolicitudPersonalizada',
      this.SolicitudPersonalizada
    );
  }
}
