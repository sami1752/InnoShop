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
import {UsuarioService} from './usuario.service';
import {Entrada} from '../models/entrada';
import {DetalleEntrada} from '../models/detalle-entrada';
import {ProductoTabla} from '../models/producto-tabla';
import {MatTableDataSource} from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(public usuarioService: UsuarioService,
              private http: HttpClient, private configuracion: ConfiguracionService,
              private formBuilder: FormBuilder) {
  }

  get idMaterial(): any {
    return this.formularioRegistroDetalleMaterial.controls.IdMaterial;
  }

  get Id(): any {
    return this.formularioRegistroProductos.controls.Id;
  }

  get Nombre(): any {
    return this.formularioRegistroProductos.controls.Nombre;
  }

  get Estado(): any {
    return this.formularioRegistroProductos.controls.Estado;
  }

  get Ancho(): any {
    return this.formularioRegistroProductos.controls.Ancho;
  }

  get Largo(): any {
    return this.formularioRegistroProductos.controls.Largo;
  }

  get Fondo(): any {
    return this.formularioRegistroProductos.controls.Fondo;
  }

  get TipoPuerta(): any {
    return this.formularioRegistroProductos.controls.TipoPuerta;
  }

  get Descripcion(): any {
    return this.formularioRegistroProductos.controls.Descripcion;
  }

  get Ruedas(): any {
    return this.formularioRegistroProductos.controls.Ruedas;
  }

  get IdUsuario(): any {
    return this.formularioRegistroProductos.controls.IdUsuario;
  }

  get Puntos(): any {
    return this.formularioRegistroProductos.controls.Puntos;
  }

  get IdCategoria(): any {
    return this.formularioRegistroProductos.controls.IdCategoria;
  }

  get GarantiaMeses(): any {
    return this.formularioRegistroProductos.controls.GarantiaMeses;
  }

  productosTabla: ProductoTabla[];
  idProducto1 = 0;
  entrada: Entrada;
  listaEntradas: Entrada[];
  DetalleMaterial: DetalleMaterial;
  listaMateriales: Material[];
  ListaDetalleMateriales: DetalleMaterialProducto[];
  precio: Precio;
  imagenFile;
  listaPrecios: Precio[];
  listaImagenes: Imagen[];
  listaImagenesProducto: Imagen[];
  producto: Producto;
  listaProductos: Producto[];
  listaCategorias: Categoria[];
  listaIVA: Iva[];
  iva: Iva;
  imagen: Imagen;
  CampoPrecio = true;
  CampoStock = true;
  FormularioPrecio = false;
  formularioEntrada = false;
  FormularioImagen = false;
  detalleProducto: Producto;
  IdProducto: number;
  desplegarDetalle = false;
  desplegarDetalleMateriales = false;
  tablaDetalleMateriales = false;

  formularioRegistroProductos = this.formBuilder.group({
    IdProducto: [],
    Nombre: [''],
    Estado: [],
    Ancho: [],
    Largo: [],
    Fondo: [],
    TipoPuerta: [''],
    Descripcion: [''],
    Ruedas: [],
    IdUsuario: [''],
    Puntos: [],
    IdCategoria: [],
    NombreCategoria: [''],
    GarantiaMeses: [],
    Precio: [],
    CantidadStock: []
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

  fecha = new Date();
  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

  registrarProducto(): any {
    this.producto.Estado = true;
    if (this.producto.Ruedas) {
      this.producto.Ruedas = true;
    } else {
      this.producto.Ruedas = false;
    }
    this.producto.IdProducto = 0;
    return this.http.post(this.configuracion.rootURL + '/Productos/Registro', this.producto);
  }

  registrarIVA(): any {
    this.iva.FechaInicio = '0001-01-01';
    this.iva.FechaFin = '0001-01-01';
    this.iva.IdIva = 0;
    console.log(this.iva);
    return this.http.put(this.configuracion.rootURL + '/Productos/AgregarIva', this.iva);
  }

  actualizacionProducto(): any {
    this.producto = this.formularioRegistroProductos.value;
    this.producto.Estado = true;
    return this.http.put(this.configuracion.rootURL + '/Productos/Editar', this.producto);
  }

  listarProducto(): any {
    this.http.get(this.configuracion.rootURL + '/Productos')
      .toPromise()
      .then(res => this.listaProductos = res as Producto[]);
  }
  listarProductoTabla(): any {
    this.http
      .get(this.configuracion.rootURL + '/Productos')
      .toPromise()
      .then(
        (res) => {
          this.productosTabla = res as ProductoTabla[];
        }
      );
  }

  listarIva(): any {
    this.http.get(this.configuracion.rootURL + '/Productos/ListarIva')
      .toPromise()
      .then(res => this.listaIVA = res as Iva[]);
  }

  listarImagenes(): any {
    this.http.get(this.configuracion.rootURL + '/Productos/ListarImagenes')
      .toPromise()
      .then(res => this.listaImagenes = res as Imagen[]);
  }

  listarCategorias(): any {
    this.http.get(this.configuracion.rootURL + '/Productos/Categorias')
      .toPromise()
      .then(res => this.listaCategorias = res as Categoria[]);
  }

  eliminarProducto(producto: Producto): any {
    producto.Estado = false;
    return this.http.put(this.configuracion.rootURL + '/Productos/Editar', producto);
  }

  buscarProductoIdDetalle(id): any {
    return this.http.get(this.configuracion.rootURL + '/Productos/Detalle/' + id)
      .toPromise().then(res => this.detalleProducto = res as Producto);
  }

  buscarProducto(id): any {
    return this.http.get(this.configuracion.rootURL + '/Productos/Buscar/' + id);

  }

  registroPrecio(): any {
    this.precio.IdProducto = this.detalleProducto.IdProducto;
    this.precio.FechaInicio = '0001-01-01';
    this.precio.FechaFin = '0001-01-01';
    this.precio.IdPrecioProducto = 0;
    return this.http.post(this.configuracion.rootURL + '/Productos/AgregarPrecio', this.precio);
  }

  registroImagen(): Observable<any> {
    this.imagen.IdProducto = this.detalleProducto.IdProducto;
    this.imagen.IdImagen = 0;
    this.imagen.Imagen = this.imagenFile;
    this.formularioRegistroImagen.patchValue(this.imagen);
    const formData = new FormData();
    formData.append('Imagen', this.formularioRegistroImagen.get('Imagen').value);
    formData.append('IdProducto', this.formularioRegistroImagen.get('IdProducto').value);
    formData.append('IdUsuario', this.formularioRegistroImagen.get('IdUsuario').value);
    console.log(this.formularioRegistroImagen.value);
    console.log(formData);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post <any>(this.configuracion.rootURL + '/Productos/Imagen/', formData);
  }

  listarImagen(id): any {
    this.http.get(this.configuracion.rootURL + '/Productos/ListaImagenes/' + id)
      .toPromise()
      .then(res => {
        this.listaImagenesProducto = res as Imagen[];
        console.log(this.listaImagenesProducto);
      });
  }

  listarPrecios(idProducto): any {
    this.http.get(this.configuracion.rootURL + '/Productos/listaPrecioProducto/' + idProducto)
      .toPromise()
      .then(res => this.listaPrecios = res as Precio[]);
  }

  fileEvent(fileInput: Event): any {
    this.imagenFile = (fileInput.target as HTMLInputElement).files[0];
    console.log((fileInput.target as HTMLInputElement).files[0]);
    console.log(this.imagenFile);
  }

  listarMateriales(): any {
    this.http.get(this.configuracion.rootURL + '/Productos/ListaMateriales')
      .toPromise()
      .then(res => this.listaMateriales = res as Material[]);
  }

  RegistrarDetalleMaterial(): any {
    this.DetalleMaterial.IdProducto = this.idProducto1;
    return this.http.post(this.configuracion.rootURL + '/Productos/AgregarDetalleMaterial', this.DetalleMaterial);
  }

  ListarDetalleMaterial(idProducto): any {
    this.http.get(this.configuracion.rootURL + '/Productos/ListaDetalleMateriales/' + idProducto)
      .toPromise()
      .then(res => this.ListaDetalleMateriales = res as DetalleMaterialProducto[]);
  }

  EliminarDetalleMaterial(id): any {
    return this.http.delete(this.configuracion.rootURL + '/Productos/EliminarMaterial/' + id);
  }

  RegistroEntrada(): any {
    this.entrada.IdEntrada = 0;
    this.entrada.Fecha = '0001-01-01';
    return this.http.post(this.configuracion.rootURL + '/Productos/AgregarEntrada', this.entrada);
  }

  listarEntradas(idProducto): any {
    this.http.get(this.configuracion.rootURL + '/Productos/listarEntradas/' + idProducto)
      .toPromise()
      .then(res => this.listaEntradas = res as Entrada[]);
  }

  listarTodosPrecios(): any {
    this.http.get(this.configuracion.rootURL + '/Productos/listaPrecioProductos')
      .toPromise()
      .then(res => this.listaPrecios = res as Precio[]);
  }

  EliminarImagen(id): any {
    return this.http.delete(this.configuracion.rootURL + '/Productos/EliminarImagen/' + id);
  }

}
