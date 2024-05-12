import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  directory: string = '../home/img/';

  checkout: Product[] = [];
  products: Product[] = [];

  product: Product = {
    idProduct: 1,
    name: 'producto 1',
    price: 12345,
    category_id: 1,
    img: 'img1',
  };

  constructor() {}
  ngOnInit() {}

  getImgOfProduct(input: string) {
    let img: String = this.directory + input;
    return img;
  }

  addProductToCheckout(product: Product) {
      this.checkout.push(product);
  }

  openModal() {}
}
