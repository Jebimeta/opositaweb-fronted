import { inject, Inject } from '@angular/core';
import { environments } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Payments } from '../interfaces/payments.interface';

@Inject({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl: string = environments.basePaymentsUrl;

  private http = inject(HttpClient);

  getPayments(): Observable<Payments[]> {
    return this.http.get<Payments[]>(this.baseUrl + '/obtain-payments');
  }

  getPaymentById(id: number) {
    return this.http
      .get<Payments>(this.baseUrl + '/find-payment/' + id)
      .pipe(catchError((error) => of(undefined)));
  }

  createPayment(payment: Payments) {
    return this.http.post<Payments>(this.baseUrl + '/create-payment', payment);
  }

  updatePayment(id: number, payment: Payments) {
    return this.http.patch<Payments>(
      this.baseUrl + '/update-payment/' + id,
      payment
    );
  }

  deletePayment(id: number) {
    return this.http.delete(this.baseUrl + '/delete-payment/' + id);
  }
}
