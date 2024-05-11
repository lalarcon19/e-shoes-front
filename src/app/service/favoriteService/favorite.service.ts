import { Injectable } from '@angular/core';
import { Favorite } from 'src/app/models/favorite';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const urlFavorite = "http://localhost:8080/favorite"

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http:HttpClient) { }

  public addFavorite(data:any):Observable<Favorite>{
    return this.http.post<Favorite>(urlFavorite + "/add", data)
  }
  public getAllFavorite(idUser: number):Observable<Favorite>{
    return this.http.get<Favorite>(urlFavorite+ `/getAll/${idUser}`)
  }
  public getByIdFavorite(idUser: number):Observable<Favorite>{
    return this.http.get<Favorite>(urlFavorite + `/getByIdFavorite/${idUser}`)
  }
  public deleteFavorite(nameProduct: String):Observable<Favorite>{
    return this.http.delete<Favorite>(urlFavorite + `/deleteProduct/${nameProduct}`)
  }
}
