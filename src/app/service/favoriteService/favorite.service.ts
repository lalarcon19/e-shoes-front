import { Injectable } from '@angular/core';
import { FavoriteResponse } from 'src/app/models/favorite';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ProductResponse } from 'src/app/models/product';

const url = "http://localhost:8080/wishlist"

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private headers: HttpHeaders;
  token = this.localStorageService.getToken()

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {

    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
  }


  public getById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(url + `/getByName/${id}`);
  }

  public update(id: number): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(url, `/update/${id}`)
  }

  public delete(id: number): Observable<ProductResponse> {
    return this.http.delete<ProductResponse>(url + `/delete/${id}`)
  }
}

