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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private router: Router,  public toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('usuarios/inicio');
    }
  }

  onSubmit(): void {
    this.usuarioService.loguin().subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('productos/inicio');
      },
      (error: any) => {
        if (error.status === 400) {
          this.toastr.info(error.error.mensaje);
        }
      }
    );
  }
}
