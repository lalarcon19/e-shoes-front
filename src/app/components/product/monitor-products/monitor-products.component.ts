import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { CategoryComponent } from '../../category/category.component';
import { ProductService } from 'src/app/service/productService/product.service';
import { ProductRequest } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ProductResponse } from 'src/app/models/product';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { Token } from 'src/app/models/token';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-monitor-products',
  templateUrl: './monitor-products.component.html',
  styleUrls: ['./monitor-products.component.css']
})
export class MonitorProductsComponent implements OnInit{

  products: ProductResponse[] = [];
  constructor(public dialog: MatDialog,
    private productService:ProductService,
    private router:Router,
    private localStorageService: LocalStorageService,){}

  show: boolean = true;
  isAdmin: boolean = false;
  flag: boolean = false
  path: string = this.router.url;
  roles: string[] = ['ROLE_ADMIN', 'ROLE_USER'];

  ngOnInit(): void {
  }

  openAddProduct(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
    })
  }
  openCategory():void{
    const dialogRef = this.dialog.open(CategoryComponent, {
    })
  }

  defineView(token: string): void {
    console.log(this.path);
    let role = this.decodeJwt(token);
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

  getProduct() {
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
      (this.products.length > 0) ? this.show = false : this.show = true;
      this.defineView(this.localStorageService.getToken())
      console.log(this.products);
    });
  }

  deleteProduct(idProduct:number):void {
    this.productService.deleteProduct(idProduct).subscribe(res => {
    console.log('producto eliminado', res);
    },
    err=>{
    console.error('Error al eliminar el producto');
    }
    );
  }

}

