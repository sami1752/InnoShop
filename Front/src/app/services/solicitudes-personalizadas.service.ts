import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DetalleEstadosMontajes} from '../models/SolicitudesPersonalizadas/detalle-estados-montajes';
import {DetalleEstadosProductosPersoanlizados} from '../models/SolicitudesPersonalizadas/detalle-estados-productos-persoanlizados';
import {DetalleEstadosSolicitudPersonalizada} from '../models/SolicitudesPersonalizadas/detalle-estados-solicitud-personalizada';
import {DetalleProductosSolicitud} from '../models/SolicitudesPersonalizadas/detalle-productos-solicitud';
import {DetallesMaterialesMontajes} from '../models/SolicitudesPersonalizadas/detalles-materiales-montajes';
import {DetallesMaterialesSolicitudesPersonalizadas} from '../models/SolicitudesPersonalizadas/detalles-materiales-solicitudes-personalizadas';
import {DetallesProductosMontajes} from '../models/SolicitudesPersonalizadas/detalles-productos-montajes';
import {Estados} from '../models/SolicitudesPersonalizadas/estados';
import {Montajes} from '../models/SolicitudesPersonalizadas/montajes';
import {PrecioMontajes} from '../models/SolicitudesPersonalizadas/precio-montajes';
import {RespuestasSolicitudesPersonalizadas} from '../models/SolicitudesPersonalizadas/respuestas-solicitudes-personalizadas';
import {SolicitudPersonalizada} from '../models/SolicitudesPersonalizadas/solicitud-personalizada';
import {ConfiguracionService} from './configuracion.service';
import {UsuarioService} from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesPersonalizadasService {
  constructor(
    public usuarioService: UsuarioService,
    private http: HttpClient,
    private configuracion: ConfiguracionService,
    private formBuilder: FormBuilder
  ) {
  }

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
  SolicitudRechazada = false;
  SolicitudCortizando = false;
  SolicitudCortizado = false;
  SolicitudEnviada = false;

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
  formularioRegistroRespuesta = this.formBuilder.group({
    IdRespuestaSolicitudesPersonalizadas: [],
    IdUsuario: [],
    IdSolicitudPersonalizada: [],
    Respuesta: [],
    Fecha: [],
    Usuario: []
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

  formularioDetalleProductoSolicitudPerzonalizada = this.formBuilder.group({
    IdDetalleProductosSolicitud: [],
    IdUsuario: [],
    IdSolicitudPersonalizada: [],
    IdProducto: [],
  });

  ListarDetalleEstadosMontajes(): void {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/DetalleEstadosMontajes')
      .toPromise()
      .then(
        (res) =>
          (this.listaDetalleEstadosMontajes = res as DetalleEstadosMontajes[])
      );
  }

  ListaDetalleEstadosMontajes(id): void {
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

  AgregarDetalleEstadosMontajes(): any {
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/DetalleEstadosMontajes/',
      this.DetalleEstadosMontajes
    );
  }

  ListarDetalleEstadosProductosPersoanlizados(): void {
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

  ListaDetalleEstadosProductosPersoanlizados(id): void {
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

  AgregarDetalleEstadosProductosPersoanlizados(): any {
    return this.http.post(
      this.configuracion.rootURL +
      '/Solicitudes/DetalleEstadosProductosPersoanlizados/',
      this.DetalleEstadosProductosPersoanlizados
    );
  }

  ListarDetalleEstadosSolicitudPersonalizada(): void {
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

  ListaDetalleEstadosSolicitudPersonalizada(id): void {
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

  AgregarDetalleEstadosSolicitudPersonalizada(): any {
    this.DetalleEstadosSolicitudPersonalizada.FechaInicio = this.hoy.toISOString();
    this.DetalleEstadosSolicitudPersonalizada.FechaFin = '0001-01-01';
    this.DetalleEstadosSolicitudPersonalizada.IdDetalleEstadoSolicitudPersonalizada = 0;
    return this.http.post(
      this.configuracion.rootURL +
      '/Solicitudes/DetalleEstadosSolicitudPersonalizada/',
      this.DetalleEstadosSolicitudPersonalizada
    );
  }

  EliminarDetalleProductosSolicitud(id): any {
    return this.http.delete(
      this.configuracion.rootURL +
      '/Solicitudes/DetalleProductosSolicitud/' +
      id
    );
  }

  ListarDetalleProductosSolicitud(): void {
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

  ListaDetalleProductosSolicitud(id): void {
    this.http
      .get(
        this.configuracion.rootURL +
        '/Solicitudes/DetalleProductosSolicitud/' +
        id
      )
      .toPromise()
      .then((res) => {
        this.listaDetalleProductosSolicitud = res as DetalleProductosSolicitud[];
        console.log(this.listaDetalleProductosSolicitud);
      });
  }

  AgregarDetalleProductosSolicitud(): any {

    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/DetalleProductosSolicitud/',
      this.DetalleProductosSolicitud
    );
  }

  EliminarDetallesMaterialesMontajes(id): any {
    return this.http.delete(
      this.configuracion.rootURL +
      '/Solicitudes/DetallesMaterialesMontajes/' +
      id
    );
  }

  ListarDetallesMaterialesMontajes(): void {
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

  ListaDetallesMaterialesMontajes(id): void {
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

  AgregarDetallesMaterialesMontajes(): any {
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/DetallesMaterialesMontajes/',
      this.DetallesMaterialesMontajes
    );
  }

  EliminarDetallesMaterialesSolicitudesPersonalizadas(id): any {
    return this.http.delete(
      this.configuracion.rootURL +
      '/Solicitudes/DetallesMaterialesSolicitudesPersonalizadas/' +
      id
    );
  }

  ListarDetallesMaterialesSolicitudesPersonalizadas(): void {
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

  ListaDetallesMaterialesSolicitudesPersonalizadas(id): void {
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

  AgregarDetallesMaterialesSolicitudesPersonalizadas(): any {
    return this.http.post(
      this.configuracion.rootURL +
      '/Solicitudes/DetallesMaterialesSolicitudesPersonalizadas/',
      this.DetallesMaterialesSolicitudesPersonalizadas
    );
  }

  EliminarDetallesProductosMontajes(id): any {
    return this.http.delete(
      this.configuracion.rootURL +
      '/Solicitudes/DetallesProductosMontajes/' +
      id
    );
  }

  ListarDetallesProductosMontajes(): void {
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

  ListaDetallesProductosMontajes(id): void {
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

  AgregarDetallesProductosMontajes(): any {
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/DetallesProductosMontajes/',
      this.DetallesProductosMontajes
    );
  }

  ListarMontajes(): void {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/Montajes')
      .toPromise()
      .then((res) => (this.listaMontajes = res as Montajes[]));
  }

  ListarMisMontajes(id): void {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/MisMontajes/' + id)
      .toPromise()
      .then((res) => (this.listaMontajes = res as Montajes[]));
  }

  BuscarMontajes(id): void {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/Montajes/' + id)
      .toPromise()
      .then((res) => (this.Montajes = res as Montajes));
  }

  AgregarMontajes(): any {
    this.Montajes.Fecha = this.hoy.toISOString();
    this.Montajes.ValorTotal = 0;
    this.Montajes.IdMontaje = 0;
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/Montajes/',
      this.Montajes
    );
  }

  EditarMontajes(): any {
    return this.http.put(
      this.configuracion.rootURL + '/Solicitudes/Montajes',
      this.Montajes
    );
  }

  ListarPrecioMontajes(): void {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/PrecioMontajes')
      .toPromise()
      .then((res) => (this.listaPrecioMontajes = res as PrecioMontajes[]));
  }

  ListaPrecioMontajes(id): void {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/PrecioMontajes/' + id)
      .toPromise()
      .then((res) => (this.listaPrecioMontajes = res as PrecioMontajes[]));
  }

  AgregarPrecioMontajes(): any {
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/PrecioMontajes/',
      this.PrecioMontajes
    );
  }

  AgregarEstados(): any {
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/Estados/',
      this.Estados
    );
  }

  ListaRespuestasSolicitudesPersonalizadas(id): void {
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

  AgregarRespuestasSolicitudesPersonalizadas(): any {

    this.RespuestasSolicitudesPersonalizadas.Fecha = this.hoy.toISOString();
    this.RespuestasSolicitudesPersonalizadas.IdRespuestaSolicitudesPersonalizadas = 0;
    console.log(this.RespuestasSolicitudesPersonalizadas);
    return this.http.post(
      this.configuracion.rootURL +
      '/Solicitudes/RespuestasSolicitudesPersonalizadas/',
      this.RespuestasSolicitudesPersonalizadas
    );
  }

  ListarSolicitudPersonalizada(): any {
    this.http
      .get(this.configuracion.rootURL + '/Solicitudes/SolicitudPersonalizada')
      .toPromise()
      .then(
        (res) =>
          (this.listaSolicitudPersonalizada = res as SolicitudPersonalizada[])
      );
  }

  ListarMisSolicitudPersonalizada(id): any {
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

  BuscarSolicitudPersonalizada(id): any {

    this.http
      .get(
        this.configuracion.rootURL + '/Solicitudes/SolicitudPersonalizada/' + id
      )
      .toPromise()
      .then((res) => {
        this.SolicitudPersonalizada = res as SolicitudPersonalizada;
        if (this.SolicitudPersonalizada.Estado === 'Rechazada') {
          // alert('Rechazada');
          this.SolicitudCortizando = false;
          this.SolicitudCortizado = false;
          this.SolicitudEnviada = false;
          this.SolicitudRechazada = true;
        }
        if (this.SolicitudPersonalizada.Estado === 'En proceso de cotizacion') {
          // alert('En proceso de cotizacion');
          this.SolicitudCortizado = false;
          this.SolicitudEnviada = false;
          this.SolicitudRechazada = false;
          this.SolicitudCortizando = true;
        }
        if (this.SolicitudPersonalizada.Estado === 'Cotizada') {
          // alert('Cotizada');
          this.SolicitudCortizando = false;
          this.SolicitudEnviada = false;
          this.SolicitudRechazada = false;
          this.SolicitudCortizado = true;
        }
        if (this.SolicitudPersonalizada.Estado === 'Modificada' ||
          this.SolicitudPersonalizada.Estado === 'Enviada' ||
          this.SolicitudPersonalizada.Estado === 'Devuelta') {
          // alert('Modificada o Enviada o Devuelta');
          this.SolicitudCortizando = false;
          this.SolicitudRechazada = false;
          this.SolicitudEnviada = true;
          this.SolicitudCortizado = false;
        }
        this.formularioRegistroSolicitudPersonalizada.patchValue(
          this.SolicitudPersonalizada
        );
      });
  }

  AgregarSolicitudPersonalizada(): any {
    this.SolicitudPersonalizada.Fecha = this.hoy.toISOString();
    this.SolicitudPersonalizada.IdSolicitudPersonalizada = 0;
    console.log(this.SolicitudPersonalizada);
    return this.http.post(
      this.configuracion.rootURL + '/Solicitudes/SolicitudPersonalizada/',
      this.SolicitudPersonalizada
    );
  }

  EditarSolicitudPersonalizada(): any {
    return this.http.put(
      this.configuracion.rootURL + '/Solicitudes/SolicitudPersonalizada',
      this.SolicitudPersonalizada
    );
  }
}
