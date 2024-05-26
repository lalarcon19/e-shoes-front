import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const urlCategory = "https://eccomerce-shoes.onrender.com/category"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public getAllCategory():Observable<Category>{
    return this.http.get<Category>(urlCategory + `/getAll`)
  }

  public createCategory(data:any):Observable<Category>{
    return this.http.post<Category>(urlCategory + "/create",data);
  }

  public getById(id: number):Observable<Category>{
    return this.http.get<Category>(urlCategory + `/getById/${id}`)
  }

}
