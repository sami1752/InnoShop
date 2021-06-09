import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-ayuda-en-linea',
  templateUrl: './ayuda-en-linea.component.html',
  styleUrls: ['./ayuda-en-linea.component.css']
})
export class AyudaEnLineaComponent implements OnInit {
  modInicioSesion = true;
  modUsuario = false;
  modProductos = false;
  modVentas = false;
  modSolicitudes = false;
  modReportes = false;
  modDescuentos = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  mostrarInicioSesion(): void{
    document.getElementById('modi').className = 'colortxt';
    document.getElementById('modu').className = '';
    document.getElementById('modp').className = '';
    document.getElementById('modv').className = '';
    document.getElementById('mods').className = '';
    document.getElementById('modr').className = '';
    document.getElementById('modd').className = '';
    this.modInicioSesion = true;
    this.modUsuario = false;
    this.modProductos = false;
    this.modVentas = false;
    this.modSolicitudes = false;
    this.modReportes = false;
    this.modDescuentos = false;
  }
  mostrarUsuarios(): void{
    document.getElementById('modi').className = '';
    document.getElementById('modu').className = 'colortxt';
    document.getElementById('modp').className = '';
    document.getElementById('modv').className = '';
    document.getElementById('mods').className = '';
    document.getElementById('modr').className = '';
    document.getElementById('modd').className = '';
    this.modInicioSesion = false;
    this.modUsuario = true;
    this.modProductos = false;
    this.modVentas = false;
    this.modSolicitudes = false;
    this.modReportes = false;
    this.modDescuentos = false;
  }
  mostrarProductos(): void{
    document.getElementById('modi').className = '';
    document.getElementById('modu').className = '';
    document.getElementById('modp').className = 'colortxt';
    document.getElementById('modv').className = '';
    document.getElementById('mods').className = '';
    document.getElementById('modr').className = '';
    document.getElementById('modd').className = '';
    this.modInicioSesion = false;
    this.modUsuario = false;
    this.modProductos = true;
    this.modVentas = false;
    this.modSolicitudes = false;
    this.modReportes = false;
    this.modDescuentos = false;

  }
  mostrarVentas(): void{
    document.getElementById('modi').className = '';
    document.getElementById('modu').className = '';
    document.getElementById('modp').className = '';
    document.getElementById('modv').className = 'colortxt';
    document.getElementById('mods').className = '';
    document.getElementById('modr').className = '';
    document.getElementById('modd').className = '';
    this.modInicioSesion = false;
    this.modUsuario = false;
    this.modProductos = false;
    this.modVentas = true;
    this.modSolicitudes = false;
    this.modReportes = false;
    this.modDescuentos = false;
  }
  mostrarSolicitudes(): void{
    document.getElementById('modi').className = '';
    document.getElementById('modu').className = '';
    document.getElementById('modp').className = '';
    document.getElementById('modv').className = '';
    document.getElementById('mods').className = 'colortxt';
    document.getElementById('modr').className = '';
    document.getElementById('modd').className = '';
    this.modInicioSesion = false;
    this.modUsuario = false;
    this.modProductos = false;
    this.modVentas = false;
    this.modSolicitudes = true;
    this.modReportes = false;
    this.modDescuentos = false;

  }
  mostrarReportes(): void{
    document.getElementById('modi').className = '';
    document.getElementById('modu').className = '';
    document.getElementById('modp').className = '';
    document.getElementById('modv').className = '';
    document.getElementById('mods').className = '';
    document.getElementById('modr').className = 'colortxt';
    document.getElementById('modd').className = '';
    this.modInicioSesion = false;
    this.modUsuario = false;
    this.modProductos = false;
    this.modVentas = false;
    this.modSolicitudes = false;
    this.modReportes = true;
    this.modDescuentos = false;
  }
  mostrarDescuentos(): void{
    document.getElementById('modi').className = '';
    document.getElementById('modu').className = '';
    document.getElementById('modp').className = '';
    document.getElementById('modv').className = '';
    document.getElementById('mods').className = '';
    document.getElementById('modr').className = '';
    document.getElementById('modd').className = 'colortxt';
    this.modInicioSesion = false;
    this.modUsuario = false;
    this.modProductos = false;
    this.modVentas = false;
    this.modSolicitudes = false;
    this.modReportes = false;
    this.modDescuentos = true;

  }
}
