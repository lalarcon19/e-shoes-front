import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  getToken(): string {
    let token = localStorage.getItem('token')
    if(token == null) {
      throw new Error("Error obteniendo el token.")
    }
    token = token.substring(1, token.length - 1)
    return String(token);
  }

  getTokenDecoded(): Token {
    let decodedToken: Token = jwtDecode(this.getItem('token'))
    return decodedToken;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }



}
