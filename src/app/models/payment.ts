export interface PaymentRequest {
  idPayment: number;
  namePayment: String;
}

export interface PaymentResponse {
  id: number;
  payme: String;
  paymentMethod: string,
  franchises: string,
  cardNumber: string
}
