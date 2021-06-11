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
  constructor(private http: HttpClient, private configuracion: ConfiguracionService, private formBuilder: FormBuilder) {
  }

  inicioSesion = false;
  desplegarDetalle = false;
  detalleUsuario: Usuario;
  perfilUsuario: Usuario;

  listaTiposDoc = [{Tipo: 'Cédula de ciudadania'},
    {Tipo: 'Tarjeta de identidad'},
    {Tipo: 'Cédula de extranjerÍa'}];

  listaSexo = [{Sexo: 'Masculino'},
    {Sexo: 'Femenino'},
    {Sexo: 'Prefiero no decirlo'}];

  uca: boolean;
  boton = 'Registrar';
  listaUsuarios: Usuario[];
  restablecimiento: Restablecimiento;
  usuario: Usuario;
  cambioContrasena: CambioContra;
  confirmarCorreo: ConfirmarCorreo = {
    id: '',
    token: ''
  };

  formularioRegistroUsuario = this.formBuilder.group({
    Id: [''],
    Nombres: ['', [Validators.required, Validators.maxLength(40), Validators.pattern(this.configuracion.exRegularLetras)]],
    Apellidos: ['', [Validators.required, Validators.maxLength(40), Validators.pattern(this.configuracion.exRegularLetras)]],
    Email: ['', [Validators.required, Validators.email]],
    TipoDocumento: ['', [Validators.required]],
    NumDocumento: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Sexo: ['', [Validators.required]],
    Telefono: ['', [Validators.required, Validators.minLength(7),
      Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    Direccion: ['', [Validators.required, Validators.maxLength(50)]],
    ConfirmarContrasena: ['', [Validators.required]]
  }, {
    validator: this.compararContrasena.bind(this)
  });


  formularioRegistroUsuarioAdmin = this.formBuilder.group({
    Id: [''],
    Nombres: ['', [Validators.required, Validators.maxLength(40), Validators.pattern(this.configuracion.exRegularLetras)]],
    Apellidos: ['', [Validators.required, Validators.maxLength(40), Validators.pattern(this.configuracion.exRegularLetras)]],
    Email: ['', [Validators.required, Validators.email]],
    TipoDocumento: ['', [Validators.required]],
    NumDocumento: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Sexo: ['', [Validators.required]],
    Telefono: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Direccion: ['', [Validators.required, Validators.maxLength(50)]],
    IdRol: ['', [Validators.required]]
  });

  formularioRegistroEdicionDatos = this.formBuilder.group({
    Id: [''],
    Nombres: ['', [Validators.required, Validators.maxLength(40), Validators.pattern(this.configuracion.exRegularLetras)]],
    Apellidos: ['', [Validators.required, Validators.maxLength(40), Validators.pattern(this.configuracion.exRegularLetras)]],
    Email: ['', [Validators.required, Validators.email]],
    TipoDocumento: ['', [Validators.required]],
    NumDocumento: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Sexo: ['', [Validators.required]],
    Telefono: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(this.configuracion.exRegularNumeros)]],
    Direccion: ['', [Validators.required, Validators.maxLength(50)]],
    IdRol: ['', [Validators.required]]
  });

  formularioLogin = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    Contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
  });

  formularioRecuperacion = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]]
  });

  formularioVerificacionRecuperacionCuenta = this.formBuilder.group({
    Token: ['', [Validators.required]],
    Id: ['', [Validators.required]],
    Contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    ConfirmarContrasena: ['', [Validators.required]]
  }, {
    validator: this.compararContrasena.bind(this)
  });

  formularioCambioContrasena = this.formBuilder.group({
    Email: [''],
    ContrasenaAntigua: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    Contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    ConfirmarContrasena: ['', [Validators.required]]
  }, {
    validator: this.compararContrasena.bind(this)
  });

  get tokenVerificacionRecuperacionDeCuenta(): any {
    return this.formularioVerificacionRecuperacionCuenta.controls.Token;
  }

  get idVerificacionRecuperacionDeCuenta(): any {
    return this.formularioVerificacionRecuperacionCuenta.controls.Id;
  }

  get contrasenaVerificacionRecuperacionDeCuenta(): any {
    return this.formularioVerificacionRecuperacionCuenta.controls.Contrasena;
  }

  get confirmarContraVerificacionRecuperacionDeCuenta(): any {
    return this.formularioVerificacionRecuperacionCuenta.controls.ConfirmarContrasena;
  }

  get emailRecuperacion(): any {
    return this.formularioRecuperacion.controls.Email;
  }

  get nombreUsuarioLogin(): any {
    return this.formularioLogin.controls.Email;
  }

  get contrasenaLogin(): any {
    return this.formularioLogin.controls.Contrasena;
  }

  get nombres(): any {
    return this.formularioRegistroUsuario.controls.Nombres;
  }

  get apellidos(): any {
    return this.formularioRegistroUsuario.controls.Apellidos;
  }

  get email(): any {
    return this.formularioRegistroUsuario.controls.Email;
  }

  get tipoDocumento(): any {
    return this.formularioRegistroUsuario.controls.TipoDocumento;
  }

  get documento(): any {
    return this.formularioRegistroUsuario.controls.NumDocumento;
  }

  get telefono(): any {
    return this.formularioRegistroUsuario.controls.Telefono;
  }

  get sexo(): any {
    return this.formularioRegistroUsuario.controls.Sexo;
  }

  get idrol(): any {
    return this.formularioRegistroUsuario.controls.IdRol;
  }

  get contrasena(): any {
    return this.formularioRegistroUsuario.controls.Contrasena;
  }

  get direccion(): any {
    return this.formularioRegistroUsuario.controls.Direccion;
  }

  get ConfirmarContrasena(): any {
    return this.formularioRegistroUsuario.controls.ConfirmarContrasena;
  }


  get contrasenaActual(): any {
    return this.formularioCambioContrasena.controls.ContrasenaAntigua;
  }

  get contrasenaNueva(): any {
    return this.formularioCambioContrasena.controls.Contrasena;
  }

  get ConfirmarcontrasenaNueva(): any {
    return this.formularioCambioContrasena.controls.ConfirmarContrasena;
  }

  get direccionAdmin(): any {
    return this.formularioRegistroUsuarioAdmin.controls.Direccion;
  }

  get nombresAdmin(): any {
    return this.formularioRegistroUsuarioAdmin.controls.Nombres;
  }

  get apellidosAdmin(): any {
    return this.formularioRegistroUsuarioAdmin.controls.Apellidos;
  }

  get emailAdmin(): any {
    return this.formularioRegistroUsuarioAdmin.controls.Email;
  }

  get tipoDocumentoAdmin(): any {
    return this.formularioRegistroUsuarioAdmin.controls.TipoDocumento;
  }

  get documentoAdmin(): any {
    return this.formularioRegistroUsuarioAdmin.controls.NumDocumento;
  }

  get telefonoAdmin(): any {
    return this.formularioRegistroUsuarioAdmin.controls.Telefono;
  }

  get sexoAdmin(): any {
    return this.formularioRegistroUsuarioAdmin.controls.Sexo;
  }

  get idrolAdmin(): any {
    return this.formularioRegistroUsuarioAdmin.controls.IdRol;
  }

  get direccionEditCuenta(): any {
    return this.formularioRegistroEdicionDatos.controls.Direccion;
  }

  get nombresEditCuenta(): any {
    return this.formularioRegistroEdicionDatos.controls.Nombres;
  }

  get apellidosEditCuenta(): any {
    return this.formularioRegistroEdicionDatos.controls.Apellidos;
  }

  get emailEditCuenta(): any {
    return this.formularioRegistroEdicionDatos.controls.Email;
  }

  get tipoDocumentoEditCuenta(): any {
    return this.formularioRegistroEdicionDatos.controls.TipoDocumento;
  }

  get documentoEditCuenta(): any {
    return this.formularioRegistroEdicionDatos.controls.NumDocumento;
  }

  get telefonoEditCuenta(): any {
    return this.formularioRegistroEdicionDatos.controls.Telefono;
  }

  get sexoEditCuenta(): any {
    return this.formularioRegistroEdicionDatos.controls.Sexo;
  }

  get idrolEditCuenta(): any {
    return this.formularioRegistroEdicionDatos.controls.IdRol;
  }

  compararContrasena(formGroup: FormGroup): any {
    const contrasena = formGroup.get('Contrasena');
    const confirmarContrasena = formGroup.get('ConfirmarContrasena');
    if (confirmarContrasena.errors == null || 'ContrasenasDiferentes' in confirmarContrasena) {
      if (contrasena.value !== confirmarContrasena.value) {
        confirmarContrasena.setErrors({
          ContrasenasDiferentes: true
        });
      } else {
        confirmarContrasena.setErrors(null);
      }
    }
  }

  registrarUsuario(): any {
    this.usuario = this.formularioRegistroUsuario.value;
    if (this.uca) {
      this.usuario.Contrasena = this.usuario.NumDocumento;
    }
    if (this.usuario.IdRol === 0 || this.usuario.IdRol == null) {
      this.usuario.IdRol = 2;
    }
    return this.http.post(this.configuracion.rootURL + '/Usuarios/Registro', this.usuario);
  }

  registrarUsuarioAdmin(): any {
    this.usuario = this.formularioRegistroUsuarioAdmin.value;
    if (this.uca) {
      this.usuario.Contrasena = this.usuario.NumDocumento;
    }
    if (this.usuario.IdRol === 0 || this.usuario.IdRol == null) {
      this.usuario.IdRol = 2;
    }
    return this.http.post(this.configuracion.rootURL + '/Usuarios/Registro', this.usuario);
  }

  activacionCorreo(): any {
    return this.http.put(this.configuracion.rootURL + '/Usuarios/ConfirmarEmail', this.confirmarCorreo);
  }

  loguin(): any {
    this.usuario = this.formularioLogin.value;
    return this.http.post(this.configuracion.rootURL + '/Usuarios/Logueo', this.usuario);
  }

  obtenerPerfil(): any {

    return this.http.get(this.configuracion.rootURL + '/Usuarios/Perfil');
  }

  enviarEmailRecuperacion(): any {
    this.restablecimiento = this.formularioRecuperacion.value;
    const resp = this.http.post(this.configuracion.rootURL + '/Usuarios/RecuperarContra', this.restablecimiento);
    return resp;
  }

  actualizacionUsuario(): any {
    this.usuario = this.formularioRegistroEdicionDatos.value;
    this.usuario.Estado = true;
    return this.http.put(this.configuracion.rootURL + '/Usuarios/ActualizacionDatos', this.usuario);
  }

  actualizacionUsuarioAdmin(): any {
    this.usuario.Estado = true;
    return this.http.put(this.configuracion.rootURL + '/Usuarios/ActualizacionDatos', this.usuario);
  }

  verificacionRecuperacionCuenta(id: string, token: string): any {
    this.restablecimiento = this.formularioVerificacionRecuperacionCuenta.value;
    this.restablecimiento.Id = id;
    this.restablecimiento.Token = token;
    return this.http.put(this.configuracion.rootURL + '/Usuarios/RestablecerContrasena', this.restablecimiento);
  }

  cambioContra(): any {
    return this.http.put(this.configuracion.rootURL + '/Usuarios/ModificarContrasena', this.cambioContrasena);
  }

  listarUsuarios(): any {
    this.http.get(this.configuracion.rootURL + '/Usuarios/ListaUsuarios')
      .toPromise()
      .then(res => this.listaUsuarios = res as Usuario[]);
  }

  eliminarUsuario(usuario: any): any {
    usuario.Estado = !usuario.Estado;
    return this.http.put(this.configuracion.rootURL + '/Usuarios/ActualizacionDatos', usuario);
  }

  buscarUsuarioId(id): any {
    return this.http.get(this.configuracion.rootURL + '/Usuarios/' + id);
  }

  buscarUsuarioIdDetalle(id): any {
    return this.http.get(this.configuracion.rootURL + '/Usuarios/' + id)
      .toPromise().then(res => this.detalleUsuario = res as Usuario);
  }

}
