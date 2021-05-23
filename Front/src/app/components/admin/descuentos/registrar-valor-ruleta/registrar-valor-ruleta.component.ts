import {Component, OnInit} from '@angular/core';
import {DescuentosService} from 'src/app/services/descuentos.service';
import {UsuarioService} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-valor-ruleta',
  templateUrl: './registrar-valor-ruleta.component.html',
  styleUrls: ['./registrar-valor-ruleta.component.css']
})
export class RegistrarValorRuletaComponent implements OnInit {

  constructor(public descuentosService: DescuentosService, public usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
  }

  registro(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      (resp: any) => {
        this.descuentosService.idUsuario = resp.Id;
        this.descuentosService.RegistrarValorRuleta().subscribe(
          (res: any) => {
            alert(res.mensaje);
            this.descuentosService.listarValoresRuleta();
            this.descuentosService.ValorRuletaActual();
          }, err => {
            alert('error');
          }
        );
      }
    );
  }

}
