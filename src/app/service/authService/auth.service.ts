import { Injectable } from '@angular/core';
import { LoginRequest } from 'src/app/models/auth-request';
import { AuthResponse } from 'src/app/models/auth-response';
import { SignupRequest } from 'src/app/models/signup-request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from 'src/app/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';

const urlUserAuth = "http://localhost:8080/user/auth"

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
    return this.http.post<AuthResponse>(urlUserAuth + "/signup", data)
  }
  
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['inicio'])
    
  }

  public login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(urlUserAuth + "/login", data)
  }

}
