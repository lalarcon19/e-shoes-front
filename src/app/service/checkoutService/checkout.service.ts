import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Checkout } from 'src/app/models/checkout';

const urlCheckout = "http://loclhost:8080/checkout"

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) {}

  public createCheckout(data:any):Observable<Checkout>{
    return this.http.post<Checkout>(urlCheckout + "/checkout",data);
  }

  public getAllProduct():Observable<Checkout>{
    return this.http.get<Checkout>(urlCheckout + `/getAll`)
  }

  public getByNumberInvoice(numberInvoice: number):Observable<Checkout>{
    return this.http.get<Checkout>(urlCheckout + `/getByNumberInvoice/${numberInvoice}`)
  }

  public updateInvoice(idInvoice: number):Observable<Checkout>{
    return this.http.put<Checkout>(urlCheckout,`/updateProduct/${idInvoice}`)
  }

  public deleteCheckout(idInvoice: number):Observable<Checkout>{
    return this.http.delete<Checkout>(urlCheckout + `deleteCheckout/${idInvoice}`)
  }

}
