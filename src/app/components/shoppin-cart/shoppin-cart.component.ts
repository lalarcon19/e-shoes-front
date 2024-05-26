import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProductResponse } from 'src/app/models/product';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';

@Component({
  selector: 'app-shoppin-cart',
  templateUrl: './shoppin-cart.component.html',
  styleUrls: ['./shoppin-cart.component.css']
})
export class ShoppinCartComponent implements OnInit {

  carrito: ProductResponse[] = [];
  flag: boolean = true;
  total: number = 0;
  cantidad: number = 1;
  productsList: ProductResponse[] = this.localStorageService.getProducts('carrito');


  constructor(private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    if (this.productsList.length === 0) {
      this.flag = false
    } else {
      this.carrito = this.productsList;
      this.carrito.map(p => {
        this.total += p.price;
        p.cantidad = this.cantidad;
      })
      console.log(this.carrito);
      
    }
  }

  addCantidad(product: ProductResponse) {
    this.cantidad++;
    product.cantidad = this.cantidad;
    this.total = this.total += product.price;
  }

  reducirCantidad(product: ProductResponse) {
    let cantidad: number = 1
  }

  deleteCarrito(product: ProductResponse) {
    if (this.productsList.length === 0) {
      this.flag = false
    } else {
      let index = this.carrito.indexOf(product);
      this.total -= product.price * product.cantidad;
      if (index > -1) {
        this.carrito.splice(index, 1);
        this.localStorageService.setItem('carrito', this.carrito)
      }

      if (this.carrito.length === 0) {
        this.flag = false;
      }
    }
  }
}


