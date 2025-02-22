// Agrega el token de autenticación a las solicitudes HTTP si el usuario está autenticado.
// Renueva el token automáticamente si ha expirado y hay un refresh token disponible.
//Maneja si la renovación del token falla, cierra la sesión del usuario.
// Si no hay token ni refresh token, envía la solicitud sin autenticación.
// Protege las solicitudes HTTP asegurándose de que siempre se use un token válido.

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import AuthService from '../services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Definimos el interceptor de autenticación
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService); // Inyectamos el AuthService para acceder a sus metodos

  const refreshToken = authService.getRefreshToken(); // Obtenemos el token de autenticación de la memoria local

  let token = authService.getToken(); // Obtenemos el token de acceso del almacenamiento local

  // Método para verificar si el token ha expirado
  const isTokenExpired = (token: string): boolean => {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token para obtener la fecha de expiración

    const expirationDate = payload.exp * 1000; // Convierte la fecha de expiracion en milisegundos

    return Date.now() > expirationDate; // Retorna true si la fecha actual es mayor a la fecha de expiración
  };

  // Si el token existe y no ha expirado:
  if (token && !isTokenExpired(token)) {
    const authReq = request.clone({
      // Clonamos la solicitud HTTP y agregamos el token de autenticación
      setHeaders: {
        Authorization: `Bearer ${token}`, // Agrega el token al encabezado de la solicitud
      },
    });
    return next(authReq); // Continua con la solicitud HTTP
  }
  // Si el token ha expirado pero hay un refreshToken disponible:
  else if (refreshToken) {
    return authService.refreshToken().pipe(
      // Si el token ha expirado, renovamos el token de autenticación con refreshToken
      switchMap((response) => {
        // Si la renovación del token es exitosa:
        authService.saveToken(response.accessToken); // Guardamos el nuevo token de acceso en la memoria local
        if (response.refreshToken) {
          // Si la respuesta incluye un nuevo token de refresco lo guarda tambien
          authService.saveRefreshToken(response.refreshToken); // Guardamos el nuevo token de refresco en la memoria local
        }

        token = response.accessToken; // Actualizamos el token con el nuevo token de acceso

        // Clonamos la solicitud HTTP y agregamos el nuevo token de autenticación
        const authReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`, // Agrega el token al encabezado de la solicitud
          },
        });
        return next(authReq); // Enviar la solicitur modificada al servidor
      }),
      catchError((refresError) => {
        console.error('Error refreshing token', refresError); // Si la renovación del token falla, muestra un mensaje de error
        authService.logout(); // Cierra la sesión del usuario
        return throwError(() => refresError); // Devuelve un error
      })
    );
  } else {
    console.warn(
      'No hay token ni refresh token. La solicitud se procesará sin el encabezado de autorización.'
    ); // Si no hay token ni refreshToken, muestra un mensaje de advertencia
    return next(request); // Si no hay token ni refreshToken, envía la solicitud sin autenticación
  }
};
