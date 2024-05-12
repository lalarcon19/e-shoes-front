import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/response';
const urlProduct = "http://localhost:8080/product"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public createProduct(data:any):Observable<Response>{
    return this.http.post<Response>(urlProduct+"/create",data)
  }
  public getAllProducts():Observable<Product>{
    return this.http.get<Product>(urlProduct+ "/all")
  }
  public getByName(name: String):Observable<Product>{
    return this.http.get<Product>(urlProduct + `/getByName/${name}`);
  }
  public updateProduct(idProduct: number):Observable<Product>{
    return this.http.put<Product>(urlProduct,`/updateProduct/${idProduct}`)
  }

  public deleteProduct(name: String):Observable<Product>{
    return this.http.delete<Product>(urlProduct + `/deleteProsuct/${name}`)
  }
}
