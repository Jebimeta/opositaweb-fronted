import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CanActivateFn, CanMatchFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment } from '@angular/router';
import AuthService from '../services/auth.service';

// Esta función verifica el estado de autenticación del usuario
const checkAuthStatus = (): Observable<boolean> => {
  // Inyecta el servicio de autenticación y el enrutador
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtiene el token de autenticación del servicio
  const token = authService.getToken();

  // Función para verificar si el token ha expirado
  const isTokenExpired = (token: string): boolean => {
    // Decodifica el token (asumiendo que es un token JWT)
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Obtiene la fecha de expiración del token
    const expirationDate = payload.exp * 1000;
    // Compara la fecha de expiración con la fecha y hora actuales
    return Date.now() > expirationDate;
  };

  // Si el token existe y no ha expirado, devuelve true
  if (token && !isTokenExpired(token)) {
    return of(true);
  } else {
    // Si el token no existe o ha expirado, redirige al usuario a la página de inicio de sesión
    router.navigate(['/auth/login']);
    return of(false);
  }
};

// Guard para proteger rutas que coinciden con ciertos segmentos de URL
export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return checkAuthStatus();
};

// Guard para proteger rutas que se están activando
export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return checkAuthStatus();
};
