import { Injectable } from '@angular/core';
import { LoginRequest } from 'src/app/models/auth-request';
import { AuthResponse } from 'src/app/models/auth-response';
import { SignupRequest } from 'src/app/models/signup-request';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from 'src/app/models/user';

const urlUserAuth = "http://localhost:8080/user/auth"

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  isAuthenticated():boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

    public signup(data: SignupRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(urlUserAuth + "/signup", data)
    }
  logout(): void {
    localStorage.removeItem('token');
  }

    public login(data: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(urlUserAuth + "/login", data)
    }

}
