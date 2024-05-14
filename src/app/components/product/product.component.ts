import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/productService/product.service';

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

  constructor(private productService:ProductService) {}
  ngOnInit() {}

  getImgOfProduct(input: string) {
    let img: String = this.directory + input;
    return img;
  }

  addProductToCheckout(product: Product) {
      this.checkout.push(product);
  }
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(res=> {
      console.log(res);
      this.products= res;
    });

  }

  openModal() {}
}
