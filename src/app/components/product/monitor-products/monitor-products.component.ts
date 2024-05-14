import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { CategoryComponent } from '../../category/category.component';
import { ProductService } from 'src/app/service/productService/product.service';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-monitor-products',
  templateUrl: './monitor-products.component.html',
  styleUrls: ['./monitor-products.component.css']
})
export class MonitorProductsComponent implements OnInit{

  listProduct: Product[] = [];
  constructor(public dialog: MatDialog, private productService:ProductService){}

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

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(res=> {
      console.log(res);
      this.listProduct= res;
    });
  }
  updateProduct(idProduct:number) {
    this.productService.updateProduct(idProduct).subscribe(res =>{
    })
  }

  deleteProduct(name:String):void {
    this.productService.deleteProduct(name).subscribe(res => {
    console.log('producto eliminado', res);
    },
    err=>{
    console.error('Error al eliminar el producto');
    }
    );
  }



}
