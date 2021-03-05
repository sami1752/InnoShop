import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import{ConfiguracionService} from './configuracion.service';
import{HttpClient} from '@angular/common/http';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private configuracion:ConfiguracionService, private formBuilder:FormBuilder) { }

  usuario:Usuario;

  formularioRegistroUsuario = this.formBuilder.group({
      Nombres:["", [Validators.required,Validators.maxLength(30), Validators.pattern(this.configuracion.exRegularLetras)]],
      Apellidos:["", [Validators.required, Validators.maxLength(30), Validators.pattern(this.configuracion.exRegularLetras)]],
      Correo:["", [Validators.required, Validators.maxLength(50), Validators.email]],
      TipoDocumento:["", [Validators.required]],
      NumDocumento:["", [Validators.required], Validators.maxLength(10), Validators.pattern(this.configuracion.exRegularNumeros)],
      Sexo:["",[Validators.required]],
      Telefono:["", [Validators.required], Validators.maxLength(10), Validators.pattern(this.configuracion.exLetrasNumeros)],
      Contrasena:["", [Validators.required],Validators.maxLength(15)],
      ConfirmarContrasena:["", [Validators.required]]},
      {validator:this.compararContrasena.bind(this)}
  );

  formularioLogin = this.formBuilder.group({
    Correo:["", [Validators.required, Validators.maxLength(50), Validators.email]],
    Contrasena:["", [Validators.required, Validators.maxLength(15)]] 
  }); 

  get nombreUsuarioLogin(){
    return this.formularioLogin.controls["Correo"];
  }

  get contrasenaLogin(){
    return this.formularioLogin.controls["Contrasena"];
  }


  get nombres(){
    return this.formularioRegistroUsuario.controls["Nombres"];
  }

  get apellidos(){
    return this.formularioRegistroUsuario.controls["Apellidos"];
  }


  get correo(){
    return this.formularioRegistroUsuario.controls["Correo"];
  }

  get tipoDocumento(){
    return this.formularioRegistroUsuario.controls["TipoDocumento"];
  }

  get documento(){
    return this.formularioRegistroUsuario.controls["NumDocumento"];
  }

  get telefono(){
    return this.formularioRegistroUsuario.controls["Telefono"];
  }
  get sexo(){
    return this.formularioRegistroUsuario.controls["Sexo"];
  }

  get Contrasena(){
    return this.formularioRegistroUsuario.controls["Contrasena"];
  }

  get ConfirmarContrasena(){
    return this.formularioRegistroUsuario.controls["ConfirmarContrasena"];
  }

  compararContrasena(formGroup:FormGroup){

    const contrasena  = formGroup.get('Contrasena');
    const confirmarContrasena  = formGroup.get('ConfirmarContrasena');
  
    if(confirmarContrasena.errors == null || 'ContrasenasDiferentes' in confirmarContrasena)

      if(contrasena.value!=confirmarContrasena.value){
      
        confirmarContrasena.setErrors({ContrasenasDiferentes:true});

      }else{

        confirmarContrasena.setErrors(null);
    
      }    
  }

  registrarUsuario(){
    

    this.usuario = this.formularioRegistroUsuario.value;
    //console.log(this.usuario);
    delete this.usuario['ConfirmarContrasena'];
    this.configuracion.router.navigateByUrl('usuarios/login');
    return this.http.post(this.configuracion.rootURL + '/Usuarios/Registro',this.usuario)
    
  }

  loguin(){
    this.usuario = this.formularioLogin.value;

    return this.http.post(this.configuracion.rootURL + '/Usuarios/Logueo',this.usuario)
  }

  obtenerPerfil(){
    
    return this.http.get(this.configuracion.rootURL + '/Usuarios/Perfil'); 
 
   }

 
  }