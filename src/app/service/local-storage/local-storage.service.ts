import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private router: Router) { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): string {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : '';
  }

  getToken(): string {
    let token;
      token = localStorage.getItem('token')
      if (token != null) {
        token = token.substring(1, token.length - 1)
      } else {
        console.log("Empty token.")
      }
    return String(token);
  }

  getTokenDecoded(): Token {
    let decodedToken: Token = jwtDecode(this.getToken())
    return decodedToken;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }



}
