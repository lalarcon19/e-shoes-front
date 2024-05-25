import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/models/user';
import { UserService } from 'src/app/service/userService/user.service';
import { UserRequest } from 'src/app/models/user';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  documentType = Object.values(DocumentType);

  userForm: FormGroup;

  constructor(private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    ){
      this.userForm = formBuilder.group ({
        id: ['', [Validators.required]],
        email: ['', [Validators.required]],
        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        documentType: ['', [Validators.required]],
        document: ['', [Validators.required]],
      })
    }

  updateUser(): void {
    const formData = this.userForm.value
    const id: number = formData.id
    let user: UserRequest = {
      id: formData.id,
      name: formData.name,
      email: formData.email,
      address: formData.name,
      documentType: formData.name,
      document: formData.name,
    };
    this.userService.updateUser(id, user).subscribe({
      next: (res: UserResponse) => {},
      error: (error) => {
        console.error(error);
      }
    })
  }
}
