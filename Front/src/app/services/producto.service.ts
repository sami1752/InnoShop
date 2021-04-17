import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  identifierModuleUrl
} from '@angular/compiler';
import {
  Injectable
} from '@angular/core';
import {
  FormBuilder
} from '@angular/forms';
import {
  Observable
} from 'rxjs';
import {
  Categoria
} from '../models/categoria';
import {
  Imagen
} from '../models/imagen';
import {
  DetalleMaterial
} from '../models/detalle-material';
import {
  DetalleMaterialProducto
} from '../models/detalle-material-producto';
import {
  Iva
} from '../models/iva';
import {
  Material
} from '../models/material';
import {
  Precio
} from '../models/precio';
import {
  Producto
} from '../models/producto';
import {
  Usuario
} from '../models/usuario';
import {
  ConfiguracionService
} from './configuracion.service';
import { UsuarioService } from './usuario.service';
import { Entrada } from '../models/entrada';
import { DetalleEntrada } from '../models/detalle-entrada';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(public usuarioService:UsuarioService ,private http: HttpClient, private configuracion: ConfiguracionService, private formBuilder: FormBuilder) {}
  
  
  idProducto1: number=0;
  entrada:Entrada;
  listaEntradas:Entrada[];
  DetalleMaterial:DetalleMaterial;
  listaMateriales:Material[];
  ListaDetalleMateriales:DetalleMaterialProducto[];
  precio:Precio;
  imagenFile
  listaPrecios: Precio[];
  listaImagenes: Imagen[]
  listaImagenesProducto : Imagen[]
  producto: Producto
  listaProductos: Producto[];
  listaCategorias: Categoria[];
  listaIVA : Iva[]
  iva : Iva
  imagen : Imagen
  CampoPrecio : boolean = true;
  CampoStock : boolean = true;
  FormularioPrecio : boolean = false
  formularioEntrada: boolean=false;
  FormularioImagen : boolean = false
  detalleProducto: Producto
  IdProducto: number
  desplegarDetalle = false;
  desplegarDetalleMateriales = false;
  tablaDetalleMateriales = false;

  formularioRegistroProductos = this.formBuilder.group({
    IdProducto: [],
    Nombre: [""],
    Estado: [],
    Ancho: [],
    Largo: [],
    Fondo: [],
    TipoPuerta: [""],
    Descripcion: [""],
    Ruedas: [],
    IdUsuario: [""],
    Puntos: [],
    IdCategoria: [],
    NombreCategoria: [""],
    GarantiaMeses: [],
    Precio:[],
    CantidadStock:[]
  });

  formularioRegistroIVA = this.formBuilder.group({
    IdIva: [],
    Porcentaje: [],
    FechaInicio: [],
    FechaFin: [],
    IdUsuario: [],
  });

  formularioRegistroEntrada = this.formBuilder.group({
    Cantidad: [],
  });

  formularioRegistroPrecio = this.formBuilder.group({
    IdPrecioProducto: [],
    Precio: [],
    FechaInicio: [],
    FechaFin: [],
    IdUsuario: [],
    IdProducto: []
  });

  formularioRegistroImagen = this.formBuilder.group({
    IdImagen: [],
    RutaImagen: [],
    Imagen: [],
    IdUsuario: [],
    IdProducto: []
  });
  formularioRegistroDetalleMaterial = this.formBuilder.group({
    IdMaterial: []
  });
  get idMaterial() {
    return this.formularioRegistroDetalleMaterial.controls["IdMaterial"]
  }

  get Id() {
    return this.formularioRegistroProductos.controls["Id"];
  }

  get Nombre() {
    return this.formularioRegistroProductos.controls["Nombre"];
  }

  get Estado() {
    return this.formularioRegistroProductos.controls["Estado"];
  }

  get Ancho() {
    return this.formularioRegistroProductos.controls["Ancho"];
  }

  get Largo() {
    return this.formularioRegistroProductos.controls["Largo"];
  }

  get Fondo() {
    return this.formularioRegistroProductos.controls["Fondo"];
  }

  get TipoPuerta() {
    return this.formularioRegistroProductos.controls["TipoPuerta"];
  }

  get Descripcion() {
    return this.formularioRegistroProductos.controls["Descripcion"];
  }

  get Ruedas() {
    return this.formularioRegistroProductos.controls["Ruedas"];
  }

  get IdUsuario() {
    return this.formularioRegistroProductos.controls["IdUsuario"];
  }

  get Puntos() {
    return this.formularioRegistroProductos.controls["Puntos"];
  }

  get IdCategoria() {
    return this.formularioRegistroProductos.controls["IdCategoria"];
  }

  get GarantiaMeses() {
    return this.formularioRegistroProductos.controls["GarantiaMeses"];
  }

  registrarProducto() {
    this.producto.Estado = true;
    if (this.producto.Ruedas)
      this.producto.Ruedas = true
    else
      this.producto.Ruedas = false
    this.producto.IdProducto = 0;
    return this.http.post(this.configuracion.rootURL + '/Productos/Registro', this.producto)
  }

  fecha = new Date();
  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

  registrarIVA() {
    this.iva.FechaInicio = this.hoy.toISOString();
    this.iva.FechaFin = "1111-11-11"
    this.iva.IdIva = 0
    return this.http.put(this.configuracion.rootURL + '/Productos/AgregarIva', this.iva)
  }

  actualizacionProducto() {
    this.producto = this.formularioRegistroProductos.value;
    this.producto.Estado = true;
    return this.http.put(this.configuracion.rootURL + '/Productos/Editar', this.producto)
  }

  listarProducto() {
    this.http.get(this.configuracion.rootURL + '/Productos')
      .toPromise()
      .then(res => this.listaProductos = res as Producto[])
  }

  listarIva() {
    this.http.get(this.configuracion.rootURL + '/Productos/ListarIva')
      .toPromise()
      .then(res => this.listaIVA = res as Iva[])
  }
  listarImagenes() {
    this.http.get(this.configuracion.rootURL + '/Productos/ListarImagenes')
      .toPromise()
      .then(res => this.listaImagenes = res as Imagen[])
  }

  listarCategorias() {
    this.http.get(this.configuracion.rootURL + '/Productos/Categorias')
      .toPromise()
      .then(res => this.listaCategorias = res as Categoria[])
  }

  eliminarProducto(producto: Producto) {
    producto.Estado = false;
    return this.http.put(this.configuracion.rootURL + '/Productos/Editar', producto);
  }

  buscarProductoIdDetalle(id) {
    return this.http.get(this.configuracion.rootURL + '/Productos/Detalle/' + id)
      .toPromise().then(res => this.detalleProducto = res as Producto);
  }

  registroPrecio() {
    this.precio.IdProducto = this.detalleProducto.IdProducto
    this.precio.FechaInicio = this.hoy.toISOString();
    this.precio.FechaFin = "0001-01-01"
    this.precio.IdPrecioProducto = 0
    return this.http.post(this.configuracion.rootURL + '/Productos/AgregarPrecio', this.precio)
  }
  registroImagen(): Observable < any > {
    this.imagen.IdProducto = this.detalleProducto.IdProducto
    this.imagen.IdImagen = 0
    this.imagen.Imagen = this.imagenFile
    this.formularioRegistroImagen.patchValue(this.imagen);
    const formData = new FormData();
    formData.append('Imagen', this.formularioRegistroImagen.get('Imagen').value);
    formData.append('IdProducto', this.formularioRegistroImagen.get('IdProducto').value);
    formData.append('IdUsuario', this.formularioRegistroImagen.get('IdUsuario').value);
    console.log(this.formularioRegistroImagen.value)
    console.log(formData)
    var headers = new HttpHeaders().set("Content-Type", "application/json")
    return this.http.post < any > (this.configuracion.rootURL + '/Productos/Imagen/', formData)
  }

  listarImagen(id) {
    this.http.get(this.configuracion.rootURL + '/Productos/ListaImagenes/' + id)
      .toPromise()
      .then(res => this.listaImagenesProducto = res as Imagen[])
  }

  listarPrecios(idProducto) {
    this.http.get(this.configuracion.rootURL + '/Productos/listaPrecioProducto/' + idProducto)
      .toPromise()
      .then(res => this.listaPrecios = res as Precio[])
  }

  fileEvent(fileInput: Event) {
    this.imagenFile = ( < HTMLInputElement > fileInput.target).files[0];
    console.log(( < HTMLInputElement > fileInput.target).files[0])
    console.log(this.imagenFile)
  }
  listarMateriales() {
    this.http.get(this.configuracion.rootURL + '/Productos/ListaMateriales')
      .toPromise()
      .then(res => this.listaMateriales = res as Material[])
  }

  RegistrarDetalleMaterial() {
    this.DetalleMaterial.IdProducto = this.idProducto1;
    return this.http.post(this.configuracion.rootURL + '/Productos/AgregarDetalleMaterial', this.DetalleMaterial)
  }

  

  ListarDetalleMaterial(idProducto) {
    this.http.get(this.configuracion.rootURL + '/Productos/ListaDetalleMateriales/' + idProducto)
      .toPromise()
      .then(res => this.ListaDetalleMateriales = res as DetalleMaterialProducto[]);
  }

  EliminarDetalleMaterial(id) {
    return this.http.delete(this.configuracion.rootURL + '/Productos/EliminarMaterial/' + id);
  }

  RegistroEntrada(){
    this.entrada.IdEntrada =0;
    this.entrada.Fecha = '1111-11-11';
    return this.http.post(this.configuracion.rootURL + '/Productos/AgregarEntrada', this.entrada)
  }

  listarEntradas(idProducto){
    this.http.get(this.configuracion.rootURL + '/Productos/listarEntradas/'+idProducto)
    .toPromise()
    .then(res => this.listaEntradas = res as Entrada[])
  }

  listarTodosPrecios(){
    this.http.get(this.configuracion.rootURL + '/Productos/listaPrecioProductos')
    .toPromise()
    .then(res => this.listaPrecios = res as Precio[])
  }

  EliminarImagen(id) {
    return this.http.delete(this.configuracion.rootURL + '/Productos/EliminarImagen/' + id);
  }

}
