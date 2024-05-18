import { Injectable } from '@angular/core';
import { UserResponse } from 'src/app/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

const urlUser = "http://localhost:8080/user"
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

  public updateUser(idUser: number):Observable<UserResponse>{
    return this.http.get<UserResponse>(urlUser + `/updateUser/${idUser}`, { headers: this.headers })
  }

  public deleteUser(document: String):Observable<UserResponse>{
    return this.http.delete<UserResponse>(urlUser + `/deleteUser/${document}`, { headers: this.headers })
  }
}
