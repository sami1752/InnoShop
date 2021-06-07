import {Component, OnInit} from '@angular/core';
import {DescuentosService} from 'src/app/services/descuentos.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {ListarValorRuletaComponent} from '../listar-valor-ruleta/listar-valor-ruleta.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registrar-valor-ruleta',
  templateUrl: './registrar-valor-ruleta.component.html',
  styleUrls: ['./registrar-valor-ruleta.component.css']
})
export class RegistrarValorRuletaComponent implements OnInit {

  constructor(public descuentosService: DescuentosService,
              public usuarioService: UsuarioService,
              public listValor: ListarValorRuletaComponent,
              public toast: ToastrService) {
  }

  ngOnInit(): void {
  }

  registro(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      (resp: any) => {
        this.descuentosService.idUsuario = resp.Id;
        this.descuentosService.RegistrarValorRuleta().subscribe(
          (res: any) => {
            this.toast.success('Registro exitoso');
            this.listValor.listarValorRuleta();
            this.descuentosService.ValorRuletaActual();
          }, err => {
            alert('error');
          }
        );
      }
    );
  }

}
