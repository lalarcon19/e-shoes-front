export interface PaymentRequest {
  paymentMethod: string,
  franchises: string,
  cardNumber: string,
  userId: number
}

export interface PaymentResponse {
  id: number;
  paymentMethod: string,
  franchises: string,
  cardNumber: string
}

export enum MethodEnum {
  CREDITO = "CREDITO",
  DEBITO = "DEBITO"
}

export enum FranchiseEnum {
  MASTERCARD = "MASTERCARD",
  VISA = "VISA"
}
