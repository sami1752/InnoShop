import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PerfilUsuario} from 'src/app/models/perfil-usuario';
import {DescuentosService} from 'src/app/services/descuentos.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {ValorRuleta} from '../../../../../models/Descuentos/valor-ruleta';
import {HttpClient} from '@angular/common/http';
import {ConfiguracionService} from '../../../../../services/configuracion.service';
import {PorcentajesRuleta} from '../../../../../models/Descuentos/porcentajes-ruleta';
import {MatTableDataSource} from '@angular/material/table';
import {VentasTabla} from '../../../../../models/Ventas/ventas-tabla';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DescuentosTabla} from '../../../../../models/Descuentos/descuentos-tabla';
import { ToastrService } from 'ngx-toastr';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-ruleta-descuentos',
  templateUrl: './ruleta-descuentos.component.html',
  styleUrls: ['./ruleta-descuentos.component.css']
})
export class RuletaDescuentosComponent implements AfterViewInit {

  displayedColumns: string[] = ['PorcentajeDescuento', 'FechaVencimiento', 'Estado'];
  dataSource: MatTableDataSource<DescuentosTabla>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public descuentosService: DescuentosService,
              public usuariosService: UsuarioService,
              private http: HttpClient,
              private configuracion: ConfiguracionService,
              public toastr: ToastrService) {
    if (localStorage.getItem('token') != null) {
      this.usuariosService.obtenerPerfil().subscribe(
        (res: any) => {
          this.perfilUsuario = (res as PerfilUsuario);
          this.listarCupones(res.Id);
        });
    }
  }

  perfilUsuario: PerfilUsuario = null;
  tablaCupones = false;
  IdPorcentajeRuleta: number;

  listarCupones(id): void {
    this.http.get(this.configuracion.rootURL + '/Descuentos/' + id).toPromise().then(
        (res) => {
          this.dataSource = new MatTableDataSource(res as DescuentosTabla[]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      );
  }
  ngAfterViewInit(): void {
    this.descuentosService.ListarPorcentajeDescuentos();
    this.descuentosService.ValorRuletaActual();
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
            this.usuariosService.obtenerPerfil().subscribe(
              (resp: any) => {
                this.perfilUsuario = (resp as PerfilUsuario);
                this.descuentosService.EditarPuntos(this.perfilUsuario.Id).subscribe(
                  // tslint:disable-next-line:no-shadowed-variable
                  (respuesta: any) => {
                    this.usuariosService.obtenerPerfil().subscribe(
                      (respueesta: any) => {
                        this.perfilUsuario = (respueesta as PerfilUsuario);
                      });
                    if ((document.getElementById('porcentaje').textContent as unknown as number) != 0) {
                      this.descuentosService.RegistrarCuponDescuento().subscribe(
                        // tslint:disable-next-line:no-shadowed-variable
                        (res: any) => {
                          document.getElementById('texto').style.fontWeight = 'light';
                          document.getElementById('textoicon').style.fontWeight = 'light';
                          this.descuentosService.ListarCuponesDeCliente(this.perfilUsuario.Id);
                          document.getElementById('textoicon').className = 'text-success';
                          document.getElementById('icon_mensaje').className = 'bi bi-patch-check-fill';
                          document.getElementById('textoicon').style.display = 'block';
                          document.getElementById('texto').className = 'text-success';
                          document.getElementById('texto').style.fontWeight = 'light';
                          document.getElementById('texto').textContent = ' ' +
                            'Obtuviste un cupón de' + ' ' + document.getElementById('porcentaje').textContent + '%';
                          this.perfilUsuario.Puntos -= this.descuentosService.valorRuleta.ValorDeRuleta;
                          window.location.reload();
                          this.toastr.success('¡Felicidades! has obtenido un cupón de descuento', 'Cupones');
                        }, err => {
                          alert('error al registrar cupon');
                        }
                      );
                    }
                  },
                  error => {
                    alert('error');
                  });
              });
          } else {
            this.toastr.info('¡Ups!, no tienes los puntos necesarios para jugar', 'Cupones');
          }
        }
      );
    } else {
      this.toastr.info('Inicia sesión para obtener descuentos', 'Cupones');
    }

  }

  obtenerID(): void {
    alert(this.IdPorcentajeRuleta);
  }


}
