import { Injectable } from '@angular/core';
import { SignupRequest } from 'src/app/models/signup-request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AuthResponse, LoginRequest } from 'src/app/models/auth';

const url = "http://localhost:8080/user/auth"

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  isAuthenticated(): boolean {
    const token = this.localStorageService.getItem('token');
    if(token == null) {
      return false
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  signup(data: SignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(url + "/signup", data)
  }

  logout(): void {
    this.localStorageService.removeItem(['token', 'wishlist', 'carrito'])
    this.router.navigate(['inicio'])
  }

  public login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(url + "/login", data)
  }

}
