import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from 'src/app/models/user';


const urlUserAuth = 'http://localhost:8080/user/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  public login(data: any): Observable<any> {
    return this.http.post<User>(urlUserAuth + '/login', data);
  }

  isAuthenticated():boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  public signup(data: any): Observable<User> {
    return this.http.post<User>(urlUserAuth + '/signup', data);
  }
}
