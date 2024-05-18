import { Component, OnInit } from '@angular/core';
import { ProductResponse } from 'src/app/models/product';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit{
  wishlist: ProductResponse[] = [];
  flag: boolean = true
  constructor(private localStorageService: LocalStorageService) {  }

  ngOnInit(): void {
      this.getWishlist()
  }

  getWishlist () {
    let productsList = this.localStorageService.getProductsToWishlist();
    if (productsList.length === 0) {
      this.flag = false
    } else {
      this.wishlist = productsList
    }
    
  }

}
