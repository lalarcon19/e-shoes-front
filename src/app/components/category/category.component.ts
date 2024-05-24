import { Component, OnInit} from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/userService/user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { CategoryService } from 'src/app/service/categoryService/category.service';
import { Category } from 'src/app/models/category';
import { Token } from 'src/app/models/token';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  cetegoryForm = new FormGroup({
    idCategory:new FormControl(''),
    nameCategory:new FormControl(''),
    description:new FormControl('')
  });

  show: boolean = true;
  isAdmin: boolean = false;
  flag: boolean = false
  path: string = this.router.url;
  roles: string[] = ['ROLE_ADMIN', 'ROLE_USER'];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private category: CategoryService) { }

  ngOnInit() {
  }

  defineView(token: string): void {
    console.log(this.path);
    let role = this.decodeJwt(token);

    if (role === this.roles[0] && this.path != '/productos') {
      this.isAdmin = true
      this.flag = true
    } else {
      this.flag == false
      this.isAdmin = false
    }
  }

  decodeJwt(token: string): String {
    let decodedToken: Token = jwtDecode(token)
    let role = this.extractRole(decodedToken.authorities.split(','))
    return role;
  }

  extractRole(input: string[]): string {
    const role = input.find(p => p.includes(this.roles[0]))

    if (role === this.roles[0]) {
      return this.roles[0]
    }

    return this.roles[1]
  }

  }



