import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  FormBuilder
} from '@angular/forms';
import { Categoria } from '../models/categoria';
import { Precio } from '../models/precio';
import {
  Producto
} from '../models/producto';
import { Usuario } from '../models/usuario';
import {
  ConfiguracionService
} from './configuracion.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(public usuarioService:UsuarioService ,private http: HttpClient, private configuracion: ConfiguracionService, private formBuilder: FormBuilder) {}
  precio:Precio;
  listaPrecios:Precio[];
  producto: Producto
  listaProductos: Producto[];
  listaCategorias: Categoria[];
  detalleProducto: Producto
  desplegarDetalle=false;
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
    Precio:[]
  });




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
    if(this.producto.Ruedas)
    this.producto.Ruedas = true
    else
    this.producto.Ruedas = false
    this.producto.IdProducto = 0
    //this.producto.Precio = 0
    console.log(this.producto)
    return this.http.post(this.configuracion.rootURL + '/Productos/Registro', this.producto)
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

  registroPrecio(){
    return this.http.post(this.configuracion.rootURL + '/Productos/AgregarPrecio', this.precio)
  }
  
  listarPrecios(idProducto){
    this.http.get(this.configuracion.rootURL + '/Productos/listaPrecioProducto/'+idProducto)
    .toPromise()
    .then(res => this.listaPrecios = res as Precio[])
  }


}
