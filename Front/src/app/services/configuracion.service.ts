import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor(public router:Router) { }

  readonly rootURL= "https://localhost:44385/api";

  public readonly exRegularLetras: any = "^[a-zA-Z ]*$";
  public readonly exRegularCorreo: any = "\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*";
  public readonly exRegularNumeros: any = "^[0-9]*$";

  public readonly exRegularPassword:any = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$";
  public readonly exLetrasNumeros: any = "^[0-9a-zA-Z]+$";

  inicioSecionAdmin : boolean


  cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('usuarios/login');
  }

  
}
