import {
  Component,
  OnInit
} from '@angular/core';
import {
  UsuarioService
} from 'src/app/services/usuario.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('usuarios/inicio');
  }

  onSubmit() {
    this.usuarioService.loguin().subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('usuarios/inicio');
        console.log(res.token)
      },
      (error: any) => {
        if (error.status == 400) {
          alert(error.error.mensaje);
        }
      }
    )
  }
}
