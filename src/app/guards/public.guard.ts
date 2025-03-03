// Importamos las funciones y clases necesarias de Angular y RxJS
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import AuthService from '../services/auth.service';

// Función que verifica el estado de autenticación del usuario
const checkAuthStatus = (): Observable<boolean> => {
  // Inyectamos el servicio de autenticación y el enrutador
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtenemos el token de autenticación
  const token = authService.getToken();

  // Función que verifica si el token ha expirado
  const isTokenExpired = (token: string): boolean => {
    // Decodificamos el payload del token
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Calculamos la fecha de expiración del token
    const expirationDate = payload.exp * 1000;
    // Comparamos la fecha de expiración con la fecha actual
    return Date.now() > expirationDate;
  };

  // Si el token existe y no ha expirado
  if (token && !isTokenExpired(token)) {
    // Retornamos un Observable que navega a la ruta raíz y luego retorna false
    return of(true).pipe(
      tap(() => router.navigate(['./'])),
      map(() => false)
    );
  } else {
    // Si no hay token o ha expirado, retornamos un Observable que retorna true
    return of(true);
  }
};

// Guard que se usa para verificar si se puede cargar un módulo (CanMatch)
export const canMatchGuardPublic: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return checkAuthStatus();
};

// Guard que se usa para verificar si se puede activar una ruta (CanActivate)
export const canActivateGuardPublic: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return checkAuthStatus();
};
