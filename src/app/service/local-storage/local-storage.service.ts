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

  getProductsToWishlist(): ProductResponse[] {
    let wishlist: ProductResponse[] = [];
    let list = localStorage.getItem('wishlist')
    if (list != null) {
      wishlist = JSON.parse(list);
      console.log(wishlist);
      return wishlist;
    } else {
      console.log("Empty wishlist.");
      return [];
    }
    
  }

  getProductsCarrito(): ProductResponse[] {
    let carrito: ProductResponse[] = [];
    let list = localStorage.getItem('carrito');
    if (list !== null) {
        try {
            const parsedList = JSON.parse(list);
            // Verifica que el dato parseado es un array
            if (Array.isArray(parsedList)) {
                carrito = parsedList as ProductResponse[];
                console.log(carrito);
            } else {
                console.error("Error: El dato parseado no es un array.");
            }
        } catch (error) {
            console.error("Error al parsear JSON desde localStorage:", error);
        }
    } else {
        console.log("Carrito vacío.");
    }
    return carrito;
    
  }

}
