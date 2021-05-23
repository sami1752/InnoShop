import {Component, OnInit} from '@angular/core';
import {PerfilUsuario} from 'src/app/models/perfil-usuario';
import {DescuentosService} from 'src/app/services/descuentos.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {ValorRuleta} from '../../../../../models/Descuentos/valor-ruleta';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../../services/configuracion.service';
import {PorcentajesRuleta} from '../../../../../models/Descuentos/porcentajes-ruleta';

@Component({
  selector: 'app-ruleta-descuentos',
  templateUrl: './ruleta-descuentos.component.html',
  styleUrls: ['./ruleta-descuentos.component.css']
})
export class RuletaDescuentosComponent implements OnInit {

  constructor(public descuentosService: DescuentosService,
              public usuarioService: UsuarioService,
              private http: HttpClient,
              private configuracion: ConfiguracionService) {
  }

  perfilUsuario: PerfilUsuario = null;
  tablaCupones = false;
  IdPorcentajeRuleta: number;

  ngOnInit(): void {
    this.descuentosService.ListarPorcentajeDescuentos();
    if (localStorage.getItem('token') != null) {
      this.usuarioService.obtenerPerfil().subscribe(
        (res: any) => {
          this.perfilUsuario = (res as PerfilUsuario);
          this.descuentosService.ListarCuponesDeCliente(this.perfilUsuario.Id);
        });
    }


    this.descuentosService.ListarPorcentajeDescuentos();
    this.descuentosService.ValorRuletaActual();
  }

  RegistrarCupon(): void {
    if (localStorage.getItem('token') != null) {
      this.http.get(this.configuracion.rootURL + '/Descuentos/Porcentajes').toPromise().then(res => {
          const listaPorcentajes = res as PorcentajesRuleta[];
          for (let i = 0; i < listaPorcentajes.length; i++) {
            if (listaPorcentajes[i].Porcentaje ==
              document.getElementById('porcentaje').textContent as unknown as number) {
              console.log(listaPorcentajes[i].IdPorcentajeRuleta);
              this.IdPorcentajeRuleta = listaPorcentajes[i].IdPorcentajeRuleta;
            }
          }
          if (this.perfilUsuario.Puntos >= this.descuentosService.valorRuleta.ValorDeRuleta) {
            this.descuentosService.descuento.IdUsuario = this.perfilUsuario.Id;
            this.descuentosService.descuento.IdPorcentajeRuleta = this.IdPorcentajeRuleta;
            console.log(this.descuentosService.descuento);
            if ((document.getElementById('porcentaje').textContent as unknown as number) != 0) {
              this.descuentosService.RegistrarCuponDescuento().subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                (res: any) => {
                  alert(res.mensaje);
                  this.descuentosService.ListarCuponesDeCliente(this.perfilUsuario.Id);
                  document.getElementById('textoicon').className = 'text-success';
                  document.getElementById('icon_mensaje').className = 'bi bi-patch-check-fill';
                  document.getElementById('textoicon').style.display = 'block';
                  document.getElementById('texto').className = 'text-success';
                  document.getElementById('texto').textContent = ' ' +
                    'Obtuviste un cupón de' + ' ' + document.getElementById('porcentaje').textContent + '%';
                  this.perfilUsuario.Puntos -= this.descuentosService.valorRuleta.ValorDeRuleta;
                }, err => {
                  alert('error al registrar cupon');
                }
              );
            }
          } else {
            alert('No tiene los puntos necesarios para jugar');
          }
        }
      );
    } else {
      alert('Inicie Sesión para poder adquirir descuento');
    }

  }

  obtenerID(): void {
    alert(this.IdPorcentajeRuleta);
  }


}
