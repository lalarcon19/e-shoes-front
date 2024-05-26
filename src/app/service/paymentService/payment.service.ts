import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable, catchError, throwError } from 'rxjs';
import { PaymentRequest, PaymentResponse } from 'src/app/models/payment';

const url = "https://eccomerce-shoes.onrender.com/payment"

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

  public create(data: PaymentRequest): Observable<HttpResponse<any>> {
    console.log(this.headers.get('Authorization'));

    return this.http.post<HttpResponse<any>>(url + "/create", data, { headers: this.headers });
  }

  public getAll(): Observable<PaymentResponse[]> {
    return this.http.get<PaymentResponse[]>(url + "/getAll", { headers: this.headers });
  }

  public getById(id: number): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(url + `/getById/${id}`, { headers: this.headers });
  }

  public update(id: number, data: PaymentRequest): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(url + `/update/${id}`, data, { headers: this.headers });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de estado HTTP: ${error.status}, Mensaje: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
