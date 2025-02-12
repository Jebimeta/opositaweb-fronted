import { inject, Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Customer } from '../interfaces/customers.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl: string = environments.baseCustomersUrl;

  private http = inject(HttpClient);

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + '/obtain-customers');
  }

  getCustomerById(id: number): Observable<Customer | undefined> {
    return this.http
      .get<Customer>(this.baseUrl + '/find-customer/' + id)
      .pipe(catchError((error) => of(undefined)));
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      this.baseUrl + '/create-customer',
      customer
    );
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(
      this.baseUrl + '/update-customer/' + id,
      customer
    );
  }

  deleteCustomer(id: number) {
    return this.http.delete(this.baseUrl + '/delete-customer/' + id);
  }
}
