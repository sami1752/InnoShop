import {Component, OnInit} from '@angular/core';
import {Usuario} from 'src/app/models/usuario';
import {SolicitudesPersonalizadasService} from 'src/app/services/solicitudes-personalizadas.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-registrar-montajes',
  templateUrl: './registrar-montajes.component.html',
  styleUrls: ['./registrar-montajes.component.css']
})
export class RegistrarMontajesComponent implements OnInit {

  constructor(
    public router: Router,
    public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
    public usuarioService: UsuarioService,
    private rutaActiva: ActivatedRoute,
    public toastr: ToastrService
  ) {
  }

  id: number = this.rutaActiva.snapshot.params.IdMontaje;

  ngOnInit(): void {
    // tslint:disable-next-line:triple-equals
    if (this.id != 0) {
      this.solicitudesPersonalizadasService.BuscarMontajes(
        this.id
      );
    }
  }

  registrar(): void {
    this.usuarioService.obtenerPerfil().subscribe(
      res => {
        this.solicitudesPersonalizadasService.Montajes =
          this.solicitudesPersonalizadasService.formularioRegistroMontaje.value;
        this.solicitudesPersonalizadasService.Montajes.IdUsuario = (res as Usuario).Id;
        this.solicitudesPersonalizadasService.AgregarMontajes().subscribe(
          (respuesta: any) => {
            this.solicitudesPersonalizadasService.formularioRegistroMontaje.reset();
            this.router.navigate(['solicitudes/MisMontajes']);
            this.toastr.success('Se registró el montaje exitosamente', 'Registro montaje');
          }, error => {
            this.toastr.error('Ha ocurrido un error');
            console.log(error);
          });
      },
      err => {
        console.log(err);
      }
    );
  }

  actualizacion(): void {
    this.solicitudesPersonalizadasService
      .EditarMontajes()
      .subscribe(
        (respuesta: any) => {
          this.router.navigate(['solicitudes/MisMontajes']);
          this.toastr.success('Se editó el montaje exitosamente', 'edición montaje');
        },
        (error) => {
          this.toastr.success('Ha ocurrido un error');
          console.log(error);
        }
      );
  }

  onSubmit(): void {
    this.solicitudesPersonalizadasService.Montajes =
      this.solicitudesPersonalizadasService.formularioRegistroMontaje.value;
    if (
      this.solicitudesPersonalizadasService.Montajes
        .IdMontaje == null ||
      this.solicitudesPersonalizadasService.Montajes
        .IdMontaje === 0
    ) {
      this.registrar();
    } else {
      this.actualizacion();
    }
  }

}
