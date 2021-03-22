import { Component } from '@angular/core';
import { ConfiguracionService } from './services/configuracion.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEndInnoshop';

  constructor(public configuracionService:ConfiguracionService ) { }
}
