
export interface Payments {
    id: number;
    amount: number;
    paymentDate: Date;
    customer: string;
    paymentPlan: string;
    subscriptionStartDate: string;
}