import { Component } from '@angular/core';
import { ConfiguracionService } from './servicios/configuracion.service';
import { UsuarioService } from './servicios/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEndInnoshop';

  constructor(public configuracionService:ConfiguracionService ) { }
}
