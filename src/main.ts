import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient
import { AppComponent } from './app/app.component';
import AuthService from './app/services/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    AuthService // Agrega provideHttpClient a la lista de providers
  ],
}).catch((err) => console.error(err));