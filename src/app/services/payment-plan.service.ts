import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaymentPlans } from '../interfaces/paymentPlans.interface';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PaymentPlanService {
  private baseUrl: string = environments.basePaymentPlansUrl;

  private http = inject(HttpClient);

  getPaymentPlans(): Observable<PaymentPlans[]> {
    return this.http.get<PaymentPlans[]>(
      this.baseUrl + '/obtain-payment-plans'
    );
  }

  getPaymentPlanById(id: number) {
    return this.http.get<PaymentPlans>(
      this.baseUrl + '/find-payment-plan/' + id
    );
  }

  createPaymentPlan(paymentPlan: PaymentPlans) {
    return this.http.post<PaymentPlans>(
      this.baseUrl + '/create-payment-plan',
      paymentPlan
    );
  }

  updatePaymentPlan(id: number, paymentPlan: PaymentPlans) {
    return this.http.patch<PaymentPlans>(
      this.baseUrl + '/update-payment-plan/' + id,
      paymentPlan
    );
  }

  deletePaymentPlan(id: number) {
    return this.http.delete(this.baseUrl + '/delete-payment-plan/' + id);
  }

}
