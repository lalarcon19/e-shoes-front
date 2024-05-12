import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator} from '@angular/forms';
import { ProductService } from 'src/app/service/productService/product.service';
import { Response } from 'src/app/models/response';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  productForm = new FormGroup({
    idProduct:new FormControl(''),
    name:new FormControl(''),
    price:new FormControl(''),
    category_id:new FormControl(''),
    img:new FormControl('')
  });
constructor(private productService:ProductService){}
  ngOnInit(): void {

  }

  addProduct():void{
    let product={
      idProduct:this.productForm.get('idProduct')?.value,
      name:this.productForm.get('name')?.value,
      price:this.productForm.get('price')?.value,
      category_id:this.productForm.get('category_id')?.value,
      img:this.productForm.get('img')?.value,
    }
   this.productService.createProduct(product).subscribe({
    next: (res: Response) => {
      if(res.status === "200"){
        alert("Registro del producto exitoso");
      }
    },
    error: (error) =>{
      console.error(error)
    }
   });
  }
}
