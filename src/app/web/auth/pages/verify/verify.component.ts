import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import AuthService from '../../../../services/auth.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-verify',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export default class VerifyComponent implements OnInit {
  private authService = inject(AuthService); // Inyecta el servicio de autenticación

  private router = inject(Router); // Inyecta el servicio de enrutamiento

  private route = inject(ActivatedRoute); // Inyecta la ruta activada para acceder a los parametros de la URL

  verificationMessage: string = '';

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // Suscribe a los cambios en los parámetros de la URL
      console.log('Parámetros de la ruta:', params);
      const token = params.get('token'); // Obtiene el token de la URL
      if (token) {
        this.verify(token); // Si se encuentra el token, verifica el token
      } else {
        this.verificationMessage = 'Token no encontrado en la URL.'; // Si no se encuentra el token, muestra un mensaje de error
        console.error(this.verificationMessage);
      }
    });

    let counter = 10;
    const interval = setInterval(() => {
      counter--;
      document.getElementById('counter')!.textContent = counter.toString();
      if (counter === 0) {
        clearInterval(interval);
        this.router.navigateByUrl('/home');
      }
    }, 1000);
  }

  //Metodo para verificar el token
  verify(token: string) {
    this.authService
      .verify(token) // Llama al método verify del servicio de autenticación
      .pipe(
        tap((response) => {
          // si la verificacion es exitosa, redirige a la pagina de inicio de sesion
          if (response) {
            this.verificationMessage =
              'Verificación exitosa. Redirigiendo a la página de inicio de sesión...';
          } else {
            this.verificationMessage = 'Error al verificar el token.'; // Si la verificación falla, muestra un mensaje de error
            console.error(this.verificationMessage);
            this.router.navigateByUrl('/auth/verify-error');
          }
        }),
        catchError((error) => {
          // Manejo de errores
          this.verificationMessage = 'Error al verificar el token.';
          console.error(this.verificationMessage, error);
          this.router.navigateByUrl('/auth/verify-error');
          return of(null); // Retorna un observable vacío para completar el flujo
        })
      )
      .subscribe(); // Se suscribe al observable para ejecutar la petición
  }
}
