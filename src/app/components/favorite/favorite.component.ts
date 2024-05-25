import { Component, OnInit } from '@angular/core';
import { ProductResponse } from 'src/app/models/product';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  wishlist: ProductResponse[] = [];
  flag: boolean = true
  productsList = this.localStorageService.getProductsToWishlist();
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist() {

    if (this.productsList.length === 0) {
      this.flag = false
    } else {
      this.wishlist = this.productsList
    }

  }

  deleteWishList(product: ProductResponse) {
    if (this.productsList.length === 0) {
      this.flag = false
    } else {
      let index = this.wishlist.indexOf(product);
      if (index > -1) {
        this.wishlist.splice(index, 1);
        this.localStorageService.setItem('wishlist', this.wishlist)
      }
    }
  }

}
