import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupRequest } from 'src/app/models/signup-request';
import { AuthService } from 'src/app/service/authService/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Token } from 'src/app/models/token';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { waitForAsync } from '@angular/core/testing';
import { LoginRequest } from 'src/app/models/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  roles: string[] = ['ROLE_ADMIN', 'ROLE_USER']
  flag: boolean = true
  path: boolean = true

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService) { }

  login() {

    let data: LoginRequest = {
      username: String(this.loginForm.get('username')?.value),
      password: String(this.loginForm.get('password')?.value)
    }

    this.authService.login(data).subscribe(
      res => {
        if (res.status === true) {
          this.localStorageService.setItem('token', res.jwt)
          this.defineView(res.jwt)
        } else {
          this.flag == false
        }
      },
      error => {
        this.flag = false
        console.log(error)
      }
    )

  }

  defineView(token: string) {
    let role = this.decodeJwt(token)
    if (role === this.roles[0]) {
      this.path = false
      this.router.navigate(['/dashboard']);
    } else {
      this.path = true
      this.router.navigate(['/inicio'])
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
