import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryEnum } from 'src/app/models/category';
import { ProductService } from 'src/app/service/productService/product.service';
import { ProductRequest, ProductResponse, UpdateProductRequest } from 'src/app/models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {

  productForm: FormGroup;

  category = Object.values(CategoryEnum);


  constructor(private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    ) {
    this.productForm = formBuilder.group ({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      img: ['', [Validators.required]]
    })
  }

  updateProduct(): void {
    const formData = this.productForm.value
    const id: number = formData.id
    let product: ProductRequest = {
      name: formData.name,
      price: formData.price,
      category: formData.category,
      img: formData.img,
    };
    this.productService.updateProduct(id, product).subscribe({
      next: (res: ProductResponse) => {},
      error: (error) => {
        console.error(error);
      },
    });
  }
}
