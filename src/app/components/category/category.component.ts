import { Component, OnInit} from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/userService/user.service';

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
  constructor(private userService:UserService){}

  ngOnInit(): void {
  }

  addCategory():void{
    let User = {
      idCategory:this.cetegoryForm.get('idCategory')?.value,
      nameCategory:this.cetegoryForm.get('nameCategory')?.value,
      description:this.cetegoryForm.get('description')?.value,
    }
  }
}
