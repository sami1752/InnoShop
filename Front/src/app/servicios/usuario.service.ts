import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { Restablecimiento } from '../modelos/restablecimiento';
import{ConfiguracionService} from './configuracion.service';
import{HttpClient} from '@angular/common/http';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CambioContra } from '../modelos/cambio-contra';
import { ConfirmarCorreo } from '../modelos/confirmar-correo';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private configuracion:ConfiguracionService, private formBuilder:FormBuilder) { }

  restablecimiento: Restablecimiento;
  usuario:Usuario;
  cambioContrasena:CambioContra;
  confirmarCorreo:ConfirmarCorreo = {id : "", token : ""};

  
//Formulario de registro del usuario
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


  //Formulario del logueo
  formularioLogin = this.formBuilder.group({
    Correo:["", [Validators.required, Validators.maxLength(50), Validators.email]],
    Contrasena:["", [Validators.required, Validators.maxLength(15)]] 
  }); 

  //Formulario de recuperacion
  formularioRecuperacion = this.formBuilder.group({
    Correo:["",[Validators.required]]
  });

  //Formulario de verificacion Recuperacion de cuenta
  formularioVerificacionRecuperacionCuenta = this.formBuilder.group({
    Token: ["",[Validators.required]],
    Id: ["",[Validators.required]],
    Contrasena: ["", [Validators.required]],
    ConfirmarContrasena: ["", [Validators.required]]},
    {validator:this.compararContrasena.bind(this)}
    );


  //Formulario de edicion de contraseña
  formularioCambioContrasena = this.formBuilder.group({
    Correo:["", [Validators.required, Validators.maxLength(50), Validators.email]],
    ContrasenaAntigua:["", [Validators.required],Validators.maxLength(15)],
    Contrasena:["",Validators.required,Validators.maxLength(15)],
    ConfirmarContrasena:["", [Validators.required]]},
    {validator:this.compararContrasena.bind(this)}
);


//get de verificacion de recuperacion de cuenta
get tokenVerificacionRecuperacionDeCuenta(){
  return this.formularioVerificacionRecuperacionCuenta.controls["Token"];
}
get idVerificacionRecuperacionDeCuenta(){
  return this.formularioVerificacionRecuperacionCuenta.controls["Id"];
}
get contrasenaVerificacionRecuperacionDeCuenta(){
  return this.formularioVerificacionRecuperacionCuenta.controls["Contrasena"];
}
get confirmarContraVerificacionRecuperacionDeCuenta(){
  return this.formularioVerificacionRecuperacionCuenta.controls["ConfirmarContrasena"];
}


//get de correo de recuperacion de cuenta
  get correoRecuperacion(){
    return this.formularioRecuperacion.controls["Correo"];
  }


  // get de logueo
  get nombreUsuarioLogin(){
    return this.formularioLogin.controls["Correo"];
  }

  get contrasenaLogin(){
    return this.formularioLogin.controls["Contrasena"];
  }

  //get de formulario de registro
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

  activacionCorreo(){

    return this.http.put(this.configuracion.rootURL + '/Usuarios/ConfirmarEmail',this.confirmarCorreo)
  }

  loguin(){
    this.usuario = this.formularioLogin.value;

    return this.http.post(this.configuracion.rootURL + '/Usuarios/Logueo',this.usuario)
  }

  obtenerPerfil(){
    
    return this.http.get(this.configuracion.rootURL + '/Usuarios/Perfil'); 
 
   }

   enviarEmailRecuperacion(){
     this.restablecimiento = this.formularioRecuperacion.value;
      var resp = this.http.post(this.configuracion.rootURL + '/Usuarios/RecuperarContra',this.restablecimiento);
      return resp;
   }



   verificacionRecuperacionCuenta(id:string, token:string){
     this.restablecimiento = this.formularioVerificacionRecuperacionCuenta.value;
     delete this.restablecimiento['ConfirmarContrasena'];

     this.restablecimiento.Id = id;
     this.restablecimiento.Token = token;
     return this.http.put(this.configuracion.rootURL + '/Usuarios/RestablecerContrasena', this.restablecimiento)
   }


   cambioContra(){
     this.cambioContrasena = this.formularioCambioContrasena.value;
    return this.http.put(this.configuracion.rootURL +'/Usuarios/ModificarContrasena',this.cambioContrasena);
   }

  

 
  }