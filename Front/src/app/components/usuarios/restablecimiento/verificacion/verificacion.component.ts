import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UsuarioService} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) {
  }

  token: string;
  id: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params.id,
        this.token = params.token;
    });
  }

  verificacion(): void {

    this.usuarioService.verificacionRecuperacionCuenta(this.id, this.token).subscribe(
      (res: any) => {
        alert(res.mensaje);
        this.router.navigateByUrl('usuarios/login');
      },
      error => {
        alert(error.error.mensaje);
      });
  }

}
