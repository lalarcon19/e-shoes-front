import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ProductResponse } from 'src/app/models/product';
import { Token } from 'src/app/models/token';
import { AuthService } from '../authService/auth.service';

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
    let token = localStorage.getItem('token');
        
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

  removeItem(key: string[]): void {
    key.map(k => localStorage.removeItem(k));
  }

  getProducts(item: string): ProductResponse[] {
    let products: ProductResponse[] = [];
    let list = this.getItem(item);

    if (list.length !== 0) {
      try {
        products = JSON.parse(list);
        console.log("Parsed product:", products);
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    } else {
      console.log("Empty products.");
    }

    return products;
  }

}
