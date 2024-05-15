import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from 'src/app/models/product';
import { LocalStorageService } from '../local-storage/local-storage.service';

const urlProduct = "http://localhost:8080/product"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private headers: HttpHeaders;
  token = this.localStorageService.getToken()

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {

    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });

   }

  

  public createProduct(data: any): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(urlProduct + "/create", data);
  }

  public getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(urlProduct + "/getAll", { headers: this.headers })
  }

  public getByName(name: String): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(urlProduct + `/getByName/${name}`);
  }

  public updateProduct(idProduct: number): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(urlProduct, `/update/${idProduct}`)
  }

  public deleteProduct(id: number): Observable<ProductResponse> {
    return this.http.delete<ProductResponse>(urlProduct + `/delete/${id}`)
  }
}
