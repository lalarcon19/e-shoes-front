import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const urlUser = "http://localhost:8008/user"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public getAllUser():Observable<User>{
    return this.http.get<User>(urlUser + "/getAll")
  }

  public getByName(name:String):Observable<User>{
    return this.http.get<User>(urlUser + `/getByName/${name}`)
  }

  public updateUser(idUser: number):Observable<User>{
    return this.http.get<User>(urlUser + `/updateUser/${idUser}`)
  }

  public deleteUser(document: String):Observable<User>{
    return this.http.delete<User>(urlUser + `/deleteUser/${document}`)
  }
}
