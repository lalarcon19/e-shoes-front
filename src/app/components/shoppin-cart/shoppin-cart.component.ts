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


  constructor(private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.getProduct();

  }

  getProduct() {
    let productsList = this.localStorageService.getProductsCarrito();
    if (productsList.length === 0) {
      this.flag = false
    } else {
      this.carrito = productsList
    }
  }

  addCantidad(product: ProductResponse) {
    product.cantidad = 1
    product.cantidad++
    this.total = this.total += product.price;
    console.log(product.cantidad);
  }

  reducirCantidad(product: ProductResponse) {
    let cantidad: number = 1

  }
}


