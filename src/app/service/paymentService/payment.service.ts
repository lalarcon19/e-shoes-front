import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable } from 'rxjs';
import { PaymentResponse } from 'src/app/models/payment';

const url = "http://localhost:8080/payment"

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private headers: HttpHeaders;
  token = this.localStorageService.getToken()

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {

    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
   }

  public create(data: PaymentRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(url + "/create", data, { headers: this.headers });
  }

  public getAll(): Observable<PaymentResponse[]> {
    return this.http.get<PaymentResponse[]>(url + "/getAll", { headers: this.headers })
  }

  public getById(id: number): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(url + `/getById/${id}`, { headers: this.headers });
  }

  public update(id: number): Observable<PaymentResponse> {
    return this.http.put<PaymentResponse>(url, `/update/${id}`, { headers: this.headers })
  }

}
