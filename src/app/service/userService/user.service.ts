import { Injectable } from '@angular/core';
import { UserRequest, UserResponse } from 'src/app/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

const urlUser = "https://eccomerce-shoes.onrender.com/user"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers: HttpHeaders;
  token = this.localStorageService.getToken()

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {

    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });

   }

  public getAllUser():Observable<UserResponse[]>{
    return this.http.get<UserResponse[]>(urlUser + `/getAll`, { headers: this.headers })
  }

  public getById(id:number):Observable<UserResponse>{
    return this.http.get<UserResponse>(urlUser + `/getById/${id}`, { headers: this.headers })
  }

 public updateUser(id: number, data: UserRequest): Observable<UserResponse>{
    return this.http.put<UserResponse>(urlUser + `/update/${id}`, data, { headers: this.headers })
  }

  public deleteUser(id:number){
    return this.http.delete(urlUser + `/delete/${id}`, { headers: this.headers })
  }
}
