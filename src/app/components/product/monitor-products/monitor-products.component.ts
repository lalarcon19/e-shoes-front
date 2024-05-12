import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { CategoryComponent } from '../../category/category.component';

@Component({
  selector: 'app-monitor-products',
  templateUrl: './monitor-products.component.html',
  styleUrls: ['./monitor-products.component.css']
})
export class MonitorProductsComponent {
  constructor(public dialog: MatDialog){}

  openAddProduct(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
    })
  }

  openCategory():void{
    const dialogRef = this.dialog.open(CategoryComponent, {
    })
  }

}
