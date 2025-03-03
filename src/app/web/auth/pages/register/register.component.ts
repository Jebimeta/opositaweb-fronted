import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../navbar/navbar.component';
import AuthService from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { Customer } from '../../../../interfaces/customers.interface';
import { tap } from 'rxjs';
import FooterComponent from "../../../footer/footer.component";

@Component({
  selector: 'app-register',
  imports: [FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export default class RegisterComponent {

  private authService = inject(AuthService);
  
  public router = inject(Router);

  user: Customer = {
    name: '',
    lastNames: '',
    dni: '',
    email: '',
    password: '',
    telephone: '',
    status: true,
  };

  register() {
    this.authService
    .register(this.user)
    .pipe(
      tap((response) => {
        console.log('Usuario registrado:', response);
        this.router.navigateByUrl('/auth/user-registered');
      })
    ).subscribe();
  }

  goTologin(): void {
    this.router.navigateByUrl('/auth/login');
  }
}
