import { inject, Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { Customer } from '../interfaces/customers.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { Login } from '../interfaces/login.interface';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  
  private baseUrl: string = environments.baseAuthUrl; //Url para la solicitud de autenticación

  private user?: Customer; //Almacena la información del usuario autenticado

  private http = inject(HttpClient); //Inyección de dependencia para el servicio HttpClient

  // Método para obtener una copia del usuario actual
  get currentUser(): Customer | undefined {
    if (!this.user) {
      return undefined; // Devolvemos undefiner si no hay un usuario autenticado para evitar errores
    }
    return structuredClone(this.user); // Devuelve una copia del usuario autenticado para evitar modificaciones inesperadas en el objeto original
  }

  // Método para registrar un nuevo usuario
  register(user: Customer): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.baseUrl + '/register', user); // Envía una solicitud POST al servidor para registrar un nuevo usuario
  }

  // Método para iniciar sesión
  login(credentials: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl + '/login', credentials); // Envía una solicitud POST al servidor para iniciar sesión
  }

  // Método para verificar un token
  verify(token: string): Observable<string> {
    return this.http
      .post(this.baseUrl + '/verify/' + token, null, {
        responseType: 'text' as 'json',
      })
      .pipe(
        map((response) => {
          try {
            const jsonResponse = JSON.parse(response as unknown as string); // Intenta convertir la respuesta en un objeto JSON
            return jsonResponse.message || response; // Devuelve el mensaje de la respuesta o la respuesta original si no hay un mensaje
          } catch (e) {
            return response as string; // Devuelve la respuesta original si no se puede convertir en un objeto JSON
          }
        }),
        catchError((error: HttpErrorResponse) => {
          // Manejo de errores de la solicitud HTTP
          throw error;
        })
      );
  }

  // Métdo para refrescar el token de autenticación
  refreshToken(): Observable<LoginResponse> {
    const refreshToken = localStorage.getItem('refreshToken'); // Obtiene el token de refresco de la memoria local

    if (!refreshToken) {
      throw new Error('No refresh token found'); // Devuelve un error si no se encuentra el token de refresco
    }

    const headers = new HttpHeaders({
      // Crea un objeto de cabeceras HTTP
      Authorization: `Bearer ${refreshToken}`, //Configura los headers con el refreshToken
    });

    return this.http.post<LoginResponse>(
      `${this.baseUrl}/refresh-token`,
      {},
      { headers }
    ); // Envía una solicitud POST al servidor para refrescar el token de autenticación con los headers configurados
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Devuelve true si el token de acceso se encuentra en la memoria local
  }

  // Método para guardar el token en memoria local
    saveToken(token: string): void {
        localStorage.setItem('token', token); // Guarda el token de acceso en la memoria local
    }

    // Método para guardar el refreshToken en memoria local
    saveRefreshToken(refreshToken: string): void {
        localStorage.setItem('refreshToken', refreshToken); // Guarda el token de refresco en la memoria local
    }

    // Método para obtener el token de la memoria local
    getToken(): string | null {
        return localStorage.getItem('token'); // Obtiene el token de la memoria local
    }

    //Metodo para obtener el refreshToken de la memoria local
    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken'); // Obtiene el token de refresco de la memoria local
    }

    // Método para cerrar la sesión del usuario
    logout(): void {
        this.user = undefined; // Elimina la información del usuario autenticado
        localStorage.clear(); // Limpia la memoria local
    }

    // Método para devodificar el token JWT
    getDecodedToken(): any {
        const token = this.getToken(); // Obtiene el token de la memoria local

        if(!token) {
            return null; // Devuelve null si no hay token
        }

        try{
            const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token
            return payload; // Devuelve el payload decodificado
        } catch (e) {
            return null; // Devuelve null si hay un error
        }
    }

    // Método para verificar si el usuario es administrador
    isAdmin(): boolean {
        const decodedToken = this.getDecodedToken(); // Obtiene el token decodificado
        return decodedToken?.role === 'ADMIN'; // Devuelve true si el rol del usuario es ADMIN
    }
}
