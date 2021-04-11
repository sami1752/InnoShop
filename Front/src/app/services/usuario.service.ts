import {
  Injectable
} from '@angular/core';
import {
  Usuario
} from '../models/usuario';
import {
  Restablecimiento
} from '../models/restablecimiento';
import {
  ConfiguracionService
} from './configuracion.service';
import {
  HttpClient
} from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  CambioContra
} from '../models/cambio-contra';
import {
  ConfirmarCorreo
} from '../models/confirmar-correo';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient, private configuracion: ConfiguracionService, private formBuilder: FormBuilder) {}
  inicioSesion = false;
  desplegarDetalle=false;
  detalleUsuario;
  perfilUsuario;

  listaTiposDoc = [{Tipo: "Cédula de ciudadania"},
  {Tipo: "Tarjeta de identidad"},
  {Tipo: "Cédula de extranjerÍa"}];

  listaSexo = [{Sexo: "Masculino"},
  {Sexo: "Femenino"},
  {Sexo: "Prefiero no decirlo"}];

  uca : boolean;
  boton = "Registrar";
  listaUsuarios: Usuario[];
  restablecimiento: Restablecimiento;
  usuario: Usuario;
  cambioContrasena: CambioContra;
  confirmarCorreo: ConfirmarCorreo = {
    id: "",
    token: ""
  };

  formularioRegistroUsuario = this.formBuilder.group({
    Id: [""],
    Nombres: ["", [Validators.required, Validators.maxLength(30), Validators.pattern(this.configuracion.exRegularLetras)]],
    Apellidos: ["", [Validators.required, Validators.maxLength(30), Validators.pattern(this.configuracion.exRegularLetras)]],
    Email: ["", [Validators.required, Validators.maxLength(50), Validators.email]],
    TipoDocumento: ["", [Validators.required]],
    NumDocumento: ["", [Validators.required,Validators.maxLength(10), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Sexo: ["", [Validators.required]],
    Telefono: ["", [Validators.required,Validators.pattern(this.configuracion.exRegularNumeros)]],
    Contrasena: ["", [Validators.required,Validators.maxLength(15)]],
    Direccion: ["", [Validators.required,Validators.maxLength(50)]],
    ConfirmarContrasena: ["", [Validators.required]]
  }, {
    validator: this.compararContrasena.bind(this)
  });




  formularioRegistroUsuarioAdmin = this.formBuilder.group({
    Id: [""],
    Nombres: ["", [Validators.required, Validators.maxLength(30), Validators.pattern(this.configuracion.exRegularLetras)]],
    Apellidos: ["", [Validators.required, Validators.maxLength(30), Validators.pattern(this.configuracion.exRegularLetras)]],
    Email: ["", [Validators.required, Validators.maxLength(50), Validators.email]],
    TipoDocumento: ["", [Validators.required]],
    NumDocumento: ["", [Validators.required,Validators.maxLength(10), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Sexo: ["", [Validators.required]],
    Telefono: ["", [Validators.required,Validators.pattern(this.configuracion.exRegularNumeros)]],
    Direccion: ["", [Validators.required,Validators.maxLength(50)]],
    IdRol: ["", [Validators.required]]
  });

  formularioRegistroEdicionDatos = this.formBuilder.group({
    Id: [""],
    Nombres: ["", [Validators.required, Validators.maxLength(30), Validators.pattern(this.configuracion.exRegularLetras)]],
    Apellidos: ["", [Validators.required, Validators.maxLength(30), Validators.pattern(this.configuracion.exRegularLetras)]],
    Email: ["", [Validators.required, Validators.maxLength(50), Validators.email]],
    TipoDocumento: ["", [Validators.required]],
    NumDocumento: ["", [Validators.required,Validators.maxLength(10), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Sexo: ["", [Validators.required]],
    Telefono: ["", [Validators.required,Validators.pattern(this.configuracion.exRegularNumeros)]],
    Direccion: ["", [Validators.required,Validators.maxLength(50)]],
    IdRol: ["", [Validators.required]]
  });

  formularioLogin = this.formBuilder.group({
    Email: ["", [Validators.required, Validators.maxLength(50), Validators.email]],
    Contrasena: ["", [Validators.required, Validators.maxLength(15)]]
  });

  formularioRecuperacion = this.formBuilder.group({
    Email: ["", [Validators.required]]
  });

  formularioVerificacionRecuperacionCuenta = this.formBuilder.group({
    Token: ["", [Validators.required]],
    Id: ["", [Validators.required]],
    Contrasena: ["", [Validators.required]],
    ConfirmarContrasena: ["", [Validators.required]]
  }, {
    validator: this.compararContrasena.bind(this)
  });

  formularioCambioContrasena = this.formBuilder.group({
    Email: ["", [Validators.required, Validators.maxLength(50), Validators.email]],
    ContrasenaAntigua: ["", [Validators.required], Validators.maxLength(15)],
    Contrasena: ["", Validators.required, Validators.maxLength(15)],
    ConfirmarContrasena: ["", [Validators.required]]
  }, {
    validator: this.compararContrasena.bind(this)
  });

  get tokenVerificacionRecuperacionDeCuenta() {
    return this.formularioVerificacionRecuperacionCuenta.controls["Token"];
  }

  get idVerificacionRecuperacionDeCuenta() {
    return this.formularioVerificacionRecuperacionCuenta.controls["Id"];
  }

  get contrasenaVerificacionRecuperacionDeCuenta() {
    return this.formularioVerificacionRecuperacionCuenta.controls["Contrasena"];
  }

  get confirmarContraVerificacionRecuperacionDeCuenta() {
    return this.formularioVerificacionRecuperacionCuenta.controls["ConfirmarContrasena"];
  }

  get emailRecuperacion() {
    return this.formularioRecuperacion.controls["Email"];
  }

  get nombreUsuarioLogin() {
    return this.formularioLogin.controls["Email"];
  }

  get contrasenaLogin() {
    return this.formularioLogin.controls["Contrasena"];
  }

  get nombres() {
    return this.formularioRegistroUsuario.controls["Nombres"];
  }

  get apellidos() {
    return this.formularioRegistroUsuario.controls["Apellidos"];
  }

  get email() {
    return this.formularioRegistroUsuario.controls["Email"];
  }

  get tipoDocumento() {
    return this.formularioRegistroUsuario.controls["TipoDocumento"];
  }

  get documento() {
    return this.formularioRegistroUsuario.controls["NumDocumento"];
  }

  get telefono() {
    return this.formularioRegistroUsuario.controls["Telefono"];
  }
  get sexo() {
    return this.formularioRegistroUsuario.controls["Sexo"];
  }
  get idrol() {
    return this.formularioRegistroUsuario.controls["IdRol"];
  }

  get contrasena() {
    return this.formularioRegistroUsuario.controls["Contrasena"];
  }

  get direccion() {
    return this.formularioRegistroUsuario.controls["Direccion"];
  }

  get ConfirmarContrasena() {
    return this.formularioRegistroUsuario.controls["ConfirmarContrasena"];
  }

  get direccionAdmin() {
    return this.formularioRegistroUsuarioAdmin.controls["Direccion"];
  }

  get nombresAdmin() {
    return this.formularioRegistroUsuarioAdmin.controls["Nombres"];
  }

  get apellidosAdmin() {
    return this.formularioRegistroUsuarioAdmin.controls["Apellidos"];
  }

  get emailAdmin() {
    return this.formularioRegistroUsuarioAdmin.controls["Email"];
  }

  get tipoDocumentoAdmin() {
    return this.formularioRegistroUsuarioAdmin.controls["TipoDocumento"];
  }

  get documentoAdmin() {
    return this.formularioRegistroUsuarioAdmin.controls["NumDocumento"];
  }

  get telefonoAdmin() {
    return this.formularioRegistroUsuarioAdmin.controls["Telefono"];
  }
  get sexoAdmin() {
    return this.formularioRegistroUsuarioAdmin.controls["Sexo"];
  }
  get idrolAdmin() {
    return this.formularioRegistroUsuarioAdmin.controls["IdRol"];
  }



  get direccionEditCuenta() {
    return this.formularioRegistroEdicionDatos.controls["Direccion"];
  }

  get nombresEditCuenta() {
    return this.formularioRegistroEdicionDatos.controls["Nombres"];
  }

  get apellidosEditCuenta() {
    return this.formularioRegistroEdicionDatos.controls["Apellidos"];
  }

  get emailEditCuenta() {
    return this.formularioRegistroEdicionDatos.controls["Email"];
  }

  get tipoDocumentoEditCuenta() {
    return this.formularioRegistroEdicionDatos.controls["TipoDocumento"];
  }

  get documentoEditCuenta() {
    return this.formularioRegistroEdicionDatos.controls["NumDocumento"];
  }

  get telefonoEditCuenta() {
    return this.formularioRegistroEdicionDatos.controls["Telefono"];
  }
  get sexoEditCuenta() {
    return this.formularioRegistroEdicionDatos.controls["Sexo"];
  }
  get idrolEditCuenta() {
    return this.formularioRegistroEdicionDatos.controls["IdRol"];
  }

  compararContrasena(formGroup: FormGroup) {
    const contrasena = formGroup.get('Contrasena');
    const confirmarContrasena = formGroup.get('ConfirmarContrasena');
    if (confirmarContrasena.errors == null || 'ContrasenasDiferentes' in confirmarContrasena)
      if (contrasena.value != confirmarContrasena.value)
        confirmarContrasena.setErrors({
          ContrasenasDiferentes: true
        });
      else
        confirmarContrasena.setErrors(null);
  }

  registrarUsuario() {
    this.usuario = this.formularioRegistroUsuario.value;
    delete this.usuario['ConfirmarContrasena'];
    if(this.uca)
      this.usuario.Contrasena = this.usuario.NumDocumento
    if(this.usuario.IdRol == 0 || this.usuario.IdRol == null)
      this.usuario.IdRol = 2
    return this.http.post(this.configuracion.rootURL + '/Usuarios/Registro', this.usuario)
  }
  registrarUsuarioAdmin() {
    this.usuario = this.formularioRegistroUsuarioAdmin.value;
    delete this.usuario['ConfirmarContrasena'];
    if(this.uca)
      this.usuario.Contrasena = this.usuario.NumDocumento
    if(this.usuario.IdRol == 0 || this.usuario.IdRol == null)
      this.usuario.IdRol = 2
    return this.http.post(this.configuracion.rootURL + '/Usuarios/Registro', this.usuario)
  }

  activacionCorreo() {
    return this.http.put(this.configuracion.rootURL + '/Usuarios/ConfirmarEmail', this.confirmarCorreo)
  }

  loguin() {
    this.usuario = this.formularioLogin.value;
    return this.http.post(this.configuracion.rootURL + '/Usuarios/Logueo', this.usuario)
  }

  obtenerPerfil() {
    
    return this.http.get(this.configuracion.rootURL + '/Usuarios/Perfil');
  }

  enviarEmailRecuperacion() {
    this.restablecimiento = this.formularioRecuperacion.value;
    var resp = this.http.post(this.configuracion.rootURL + '/Usuarios/RecuperarContra', this.restablecimiento);
    return resp;
  }

  actualizacionUsuario(){
    this.usuario = this.formularioRegistroEdicionDatos.value;
    this.usuario.Estado=true;
    return this.http.put(this.configuracion.rootURL + '/Usuarios/ActualizacionDatos', this.usuario)
  }

  actualizacionUsuarioAdmin(){
    this.usuario.Estado=true;
    return this.http.put(this.configuracion.rootURL + '/Usuarios/ActualizacionDatos', this.usuario)
  }

  verificacionRecuperacionCuenta(id: string, token: string) {
    this.restablecimiento = this.formularioVerificacionRecuperacionCuenta.value;
    delete this.restablecimiento['ConfirmarContrasena'];
    this.restablecimiento.Id = id;
    this.restablecimiento.Token = token;
    return this.http.put(this.configuracion.rootURL + '/Usuarios/RestablecerContrasena', this.restablecimiento)
  }

  cambioContra() {
    this.cambioContrasena = this.formularioCambioContrasena.value;
    return this.http.put(this.configuracion.rootURL + '/Usuarios/ModificarContrasena', this.cambioContrasena);
  }

  listarUsuarios() {
    this.http.get(this.configuracion.rootURL + '/Usuarios/ListaUsuarios')
      .toPromise()
      .then(res => this.listaUsuarios = res as Usuario[])
  }

  eliminarUsuario(usuario:Usuario) {
    usuario.Estado=false;
    return this.http.put(this.configuracion.rootURL + '/Usuarios/ActualizacionDatos',  usuario);
  }

  buscarUsuarioId(id){
   return this.http.get(this.configuracion.rootURL + '/Usuarios/' + id)
  }
  
  buscarUsuarioIdDetalle(id){
    return this.http.get(this.configuracion.rootURL + '/Usuarios/' + id)
 .toPromise().then(res=>this.detalleUsuario = res as Usuario);
   }

}
