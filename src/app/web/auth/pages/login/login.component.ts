import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import AuthService from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../../../../interfaces/login.interface';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule], // Importamos el módulo de formularios
  templateUrl: './login.component.html',
  styles: ``,
})
export default class LoginComponent {
  private authService = inject(AuthService); // Inyectamos el servicio de autenticación para poder utilizar los metodos de login

  public router = inject(Router); // Inyectamos el router para poder redirigir a otras rutas

  user: Login = {
    // Creamos un objeto para almacenar los datos del formulario
    email: '',
    password: '',
  };

  login() {
    // Método para loguear al usuario
    this.authService
      .login(this.user)
      .pipe(
        // Llamamos al metodo login del servicio de autenticación
        tap((response) => {
          // Utilizamos el operador tap para realizar acciones secundarias
          if (response && response.accessToken) {
            // Si la respuesta es valida y contiene un token

            this.authService.saveToken(response.accessToken); // Guardamos el token en el local storage

            this.authService.saveRefreshToken(response.refreshToken); // Guardamos el refresh token en el local storage

            this.router.navigateByUrl('/home'); // Redirigimos al usuario a la ruta /home
          }
        }),
        catchError((error) => {
          // Manejamos el error
          return of(null); // Retornamos un observable con un valor nulo
        })
      )
      .subscribe(); // Nos suscribimos al observable para que se ejecute
  }

  goToRegister() {
    // Método para redirigir al usuario a la ruta de registro
    this.router.navigateByUrl('/auth/register'); // Redirigimos al usuario a la ruta /register
  }
}
