import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Login } from '../../../../interfaces/login.interface';
import AuthService from '../../../../services/auth.service';
import { NavbarComponent } from '../../../navbar/navbar.component';
import FooterComponent from "../../../footer/footer.component";

@Component({
  selector: 'app-login',
  imports: [FormsModule, NavbarComponent, FooterComponent], // Importamos el módulo de formularios
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent {
  private authService = inject(AuthService); // Inyectamos el servicio de autenticación
  public router = inject(Router); // Inyectamos el router para redirigir a otras rutas

  // Objeto para almacenar los datos del formulario
  user: Login = {
    email: '',
    password: '',
  };

  // Placeholders iniciales
  emailPlaceholder = 'correo_registrado@gmail.com';
  passwordPlaceholder = '*********';

  // Método para borrar el placeholder
  clearPlaceholder(field: string) {
    if (field === 'email') {
      this.emailPlaceholder = '';
    } else if (field === 'password') {
      this.passwordPlaceholder = '';
    }
  }

  // Método para restaurar el placeholder
  restorePlaceholder(field: string) {
    if (field === 'email' && !this.user.email) {
      this.emailPlaceholder = 'correo_registrado@gmail.com';
    } else if (field === 'password' && !this.user.password) {
      this.passwordPlaceholder = '*********';
    }
  }

  // Método para loguear al usuario
  login() {
    this.authService
      .login(this.user)
      .pipe(
        tap((response) => {
          if (response && response.accessToken) {
            this.authService.saveToken(response.accessToken); // Guardamos el token en el local storage
            this.authService.saveRefreshToken(response.refreshToken); // Guardamos el refresh token en el local storage
            this.router.navigateByUrl('/home'); // Redirigimos al usuario a la ruta /home
          }
        }),
        catchError((error) => {
          console.error('Error durante el login:', error);
          return of(null); // Retornamos un observable con un valor nulo
        })
      )
      .subscribe(); // Nos suscribimos al observable para que se ejecute
  }

  // Método para redirigir al usuario a la ruta de registro
  goToRegister(): void {
    this.router.navigateByUrl('/auth/register'); // Redirigimos al usuario a la ruta /register
  }
}