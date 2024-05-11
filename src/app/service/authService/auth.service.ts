import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

const urlUserAuth = "http://localhost:8080/auth"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

public signup(data:any):Observable<User>{
  return this.http.post<User>(urlUserAuth + "/signup", data)
}

public login(data:any):Observable<User>{
  return this.http.post<User>(urlUserAuth + "/login", data)
}
}
