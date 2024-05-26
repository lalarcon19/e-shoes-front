import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/productService/product.service';
import { Response } from 'src/app/models/response';
import { ProductRequest, ProductResponse } from 'src/app/models/product';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/token';
import { jwtDecode } from 'jwt-decode';
import { CategoryEnum } from 'src/app/models/category';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm: FormGroup;

  category = Object.values(CategoryEnum);


  constructor(private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    ) {
    this.productForm = formBuilder.group ({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      img: ['', [Validators.required]]
    })
  }

  addProduct(): void {
    const formData = this.productForm.value
    let product: ProductRequest = {
      name: formData.name,
      price: formData.price,
      category: formData.category,
      img: formData.img,
    };
    this.productService.createProduct(product).subscribe({
      next: (res: ProductResponse) => {
        alert("Producto creado exitosamente")
        window.location.reload();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
