import { PaymentResponse } from "./payment";

export interface UserResponse {
  id:number
  address: string;
  document: string;
  email: string;
  lastName: string
  name: string;
  documentType: string;
  payment: PaymentResponse[]
}