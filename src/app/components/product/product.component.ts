import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Category, CategoryEnum } from 'src/app/models/category';
import { ProductRequest, ProductResponse } from 'src/app/models/product';
import { Token } from 'src/app/models/token';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { ProductService } from 'src/app/service/productService/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  carrito: ProductResponse[] = [];
  products: ProductResponse[] = [];
  wishlist: ProductResponse[] = [];

  show: boolean = true;
  isAdmin: boolean = false;
  flag: boolean = false
  path: string = this.router.url;
  roles: string[] = ['ROLE_ADMIN', 'ROLE_USER'];

  constructor(private productService: ProductService, 
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {   
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
      (this.products.length > 0) ? this.show = false : this.show = true;
      this.defineView(this.localStorageService.getToken())
      console.log(this.products);
    });
  }

  defineView(token: string): void {
    console.log(this.path);
    let role = this.decodeJwt(token);

    if (role === this.roles[0] && this.path != '/productos') {
      this.isAdmin = true
      this.flag = true
    } else {
      this.flag == false
      this.isAdmin = false
    }
  }

  decodeJwt(token: string): String {
    let decodedToken: Token = jwtDecode(token)
    let role = this.extractRole(decodedToken.authorities.split(','))
    return role;
  }

  extractRole(input: string[]): string {
    const role = input.find(p => p.includes(this.roles[0]))

    if (role === this.roles[0]) {
      return this.roles[0]
    }

    return this.roles[1]
  }

  addToWishlist (product: ProductResponse) {
    this.wishlist.push(product);
    this.localStorageService.setItem('wishlist', JSON.stringify(this.wishlist));
    console.log("se agrego el producto.", this.wishlist);
  }

  addToCarrito (product: ProductResponse) {
    this.carrito.push(product);
    this.localStorageService.setItem('carrito', JSON.stringify(this.carrito));
    console.log("se agrego el producto.", this.carrito);
  }

}
