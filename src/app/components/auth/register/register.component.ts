import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentType, SignupRequest } from 'src/app/models/signup-request';
import { AuthService } from 'src/app/service/authService/auth.service';
import { FavoriteService } from 'src/app/service/favoriteService/favorite.service';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  documentType = Object.values(DocumentType);
  selectedDocType = this.documentType;
  signupform: FormGroup;

  isEmailInvalidAndTouched = () => {
    const control = this.signupform.get('email');
    return control !== null && control.invalid && control.touched;
  };

  isEmailRequiredError = () => {
    const control = this.signupform.get('email');
    return control !== null && control.hasError('required');
  };

  hasEmailAValidFormat = () => {
    const control = this.signupform.get('email');
    return control !== null && control.hasError('email');
  }

  isPasswordInvalidAndTouched = () => {
    const control = this.signupform.get('password');
    return control !== null && control.invalid && control.touched;
  };

  isPasswordRequiredError = () => {
    const control = this.signupform.get('password');
    return control !== null && control.hasError('required');
  };

  isPasswordMinLengthError = () => {
    const control = this.signupform.get('password');
    return control !== null && control.hasError('minlength');
  };


  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private router: Router) {

    this.signupform = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      documentType: ['', [Validators.required]],
      document: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

  }

  signup() {
    if (this.signupform.valid) {
      const formData = this.signupform.value

      let data: SignupRequest = {
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        documentType: formData.documentType,
        document: formData.document,
        address: formData.address,
        password: formData.password
      };

      console.log(data);
      this.authService.signup(data).subscribe(
        res => {
          if (res.status === true) {
            this.localStorageService.setItem('token', res.jwt);
            this.router.navigate(['inicio'])
          }
        });
    }

  }

}
