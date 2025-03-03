import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CustomerService } from '../../../../../services/customer.service';
import { Router } from '@angular/router';
import { CustomerResponse } from '../../../../../interfaces/customersResponse.interface';

@Component({
  selector: 'customer-list',
  standalone: true,
  imports: [],
  templateUrl: './customer-list.component.html',
})
export default class CustomerListComponent {

  public customerService = inject(CustomerService);

  public cdr = inject(ChangeDetectorRef);

  public customers: CustomerResponse[] = [];

  public router = inject(Router);

  ngOnInit(): void {
    this.customerService.getCustomers()
    .subscribe(customers => {
      this.customers = customers;
      this.cdr.detectChanges();
    });
  }

  updateCustomer(id: number): void {
    this.router.navigateByUrl('dashboard-users/update-costumer/' + id);
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id)
    .subscribe(() => {
      this.customers = this.customers.filter(customer => customer.id !== id);
      this.cdr.detectChanges();
    });
  }

  createCustomer(): void {
    this.router.navigateByUrl('dashboard-users/create-costumer');
  }

  getAllCustomers(): void {
    this.router.navigateByUrl('dashboard-users/customer-list');
  }



}
