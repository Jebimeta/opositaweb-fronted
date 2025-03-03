import { Component } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export default class CustomerComponent {
  constructor(private router: Router) {}

  navigateToCreateCustomer() {
    this.router.navigate(['/admin/dashboard-users/create-customer']);
  }
}