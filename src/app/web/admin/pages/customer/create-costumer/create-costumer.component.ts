import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomerService } from '../../../../../services/customer.service';
import { environments } from '../../../../../environments/environments';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../../../../interfaces/customers.interface';
import { switchMap } from 'rxjs';
import { NavbarComponent } from '../../../../navbar/navbar.component';

// Definición del componente CreateCostumerComponent
@Component({
  selector: 'create-customer', // Selector del componente
  imports: [ReactiveFormsModule], // Importa ReactiveFormsModule para manejar formularios reactivos
  templateUrl: './create-costumer.component.html', // Plantilla HTML del componente
  styleUrls: ['./create-costumer.component.css'], // Estilos CSS del componente
})
export default class CreateCustomerComponent implements OnInit {
  // Inyección de dependencias
  private customerService = inject(CustomerService); // Servicio para manejar clientes
  private activatedRoute = inject(ActivatedRoute); // Para obtener parámetros de la ruta
  private router = inject(Router); // Para navegar entre rutas
  private baseUrl: string = environments.baseCustomersUrl; // URL base para las peticiones de clientes

  // Definición del formulario reactivo con sus controles
  public customerFrom = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }), // Control para el nombre del cliente
    lastNames: new FormControl<string>('', { nonNullable: true }), // Control para los apellidos del cliente
    dni: new FormControl<string>('', { nonNullable: true }), // Control para el DNI del cliente
    email: new FormControl<string>('', { nonNullable: true }), // Control para el email del cliente
    password: new FormControl<string>('', { nonNullable: true }), // Control para la contraseña del cliente
    confirmPassword: new FormControl<string>('', { nonNullable: true }), // Nuevo campo para confirmar la contraseña
    telephone: new FormControl<string>('', { nonNullable: true }), // Control para el teléfono del cliente
    status: new FormControl<boolean>(true, { nonNullable: true }), // Control para el estado del cliente (activo/inactivo)
  });

  // Getter para obtener el valor actual del formulario como un objeto de tipo Customer
  get currentCustomer(): Customer {
    const customer = this.customerFrom.value as Customer;
    return customer;
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
  // Si la URL no incluye 'update', no hace nada más
  if (!this.router.url.includes('update')) {
    return;
  }

  // Obtiene el parámetro 'id' de la ruta y busca el cliente correspondiente
  this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.customerService.getCustomerById(id)), // Cambia el flujo para obtener el cliente por ID
    ).subscribe(customer => {
      if (!customer) {
        this.router.navigateByUrl('/home'); // Si no encuentra el cliente, redirige a la página de inicio
        return;
      }
      this.customerFrom.reset(customer); // Si encuentra el cliente, resetea el formulario con sus datos
    });
}

  // Método para validar las contraseñas
  private validatePasswords(): boolean {
    const password = this.customerFrom.get('password')?.value ?? '';
    const confirmPassword = this.customerFrom.get('repeat-password')?.value ?? '';

    // if (password !== confirmPassword) {
    //   alert('Las contraseñas no coinciden.');
    //   return false;
    // }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(password)) {
      alert('La contraseña debe tener entre 8 y 16 caracteres, incluir al menos una mayúscula, un número y un carácter especial.');
      return false;
    }

    const consecutiveNumbersRegex = /\d{3,}/;
    if (consecutiveNumbersRegex.test(password)) {
      alert('La contraseña no puede tener más de dos números seguidos.');
      return false;
    }

    return true;
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    // Si el formulario es inválido o las contraseñas no son válidas, no hace nada
    if (this.customerFrom.invalid || !this.validatePasswords()) return;
  
    // Crear un objeto Customer a partir del formulario
    const customer: Customer = {
      name: this.customerFrom.get('name')?.value ?? '',
      lastNames: this.customerFrom.get('lastNames')?.value ?? '',
      dni: this.customerFrom.get('dni')?.value ?? '',
      email: this.customerFrom.get('email')?.value ?? '',
      password: this.customerFrom.get('password')?.value ?? '',
      telephone: this.customerFrom.get('telephone')?.value ?? '',
      status: this.customerFrom.get('status')?.value ?? true,
    };
  
    this.customerService.createCustomer(customer).subscribe(customer => {
      this.router.navigateByUrl('/admin/customers');
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/admin/customers');
  }
}