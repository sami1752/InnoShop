import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SolicitudesPersonalizadasService} from '../../../../../services/solicitudes-personalizadas.service';
import {UsuarioService} from '../../../../../services/usuario.service';

@Component({
  selector: 'app-editar-montaje',
  templateUrl: './editar-montaje.component.html',
  styleUrls: ['./editar-montaje.component.css']
})
export class EditarMontajeComponent implements OnInit {

  constructor(public router: Router,
              public solicitudesPersonalizadasService: SolicitudesPersonalizadasService,
              public usuarioService: UsuarioService,
              private rutaActiva: ActivatedRoute) {
  }

  id: number = this.rutaActiva.snapshot.params.IdMontaje;

  ngOnInit(): void {
    alert(this.id);
    this.solicitudesPersonalizadasService.BuscarMontajes(this.id);
  }

  actualizacion(): void {
    this.solicitudesPersonalizadasService.Montajes =
      this.solicitudesPersonalizadasService.formularioRegistroMontaje.value;
    this.solicitudesPersonalizadasService
      .EditarMontajes()
      .subscribe(
        (respuesta: any) => {
          this.router.navigate(['Admin/detalleSP/',
            this.solicitudesPersonalizadasService.Montajes.IdMontaje]);
          alert('Actualizacion Exitosa');
        },
        (error) => {
          alert(error);
          console.log(error);
        }
      );
  }

}
