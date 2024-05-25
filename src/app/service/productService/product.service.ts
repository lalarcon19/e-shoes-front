import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductRequest, ProductResponse, UpdateProductRequest } from 'src/app/models/product';
import { LocalStorageService } from '../local-storage/local-storage.service';

const urlProduct = "https://eccomerce-shoes.onrender.com/product"

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
    return this.http.post<ProductResponse>(urlProduct + "/create", data, { headers: this.headers });
  }

  public getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(urlProduct + "/getAll", { headers: this.headers })
  }

  public getByName(name: String): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(urlProduct + `/getByName/${name}`, { headers: this.headers });
  }

  public updateProduct(idProduct: number, data: ProductRequest): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(urlProduct + `/update/${idProduct}`, data, { headers: this.headers })
  }

  public deleteProduct(id: number) {
    return this.http.delete(urlProduct + `/delete/${id}`, { headers: this.headers })
  }
}
