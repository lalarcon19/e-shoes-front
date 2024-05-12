import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{

  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
      
  }

  login():void{
    this.authService.login(this.credentials).subscribe(
      response => {
        localStorage.setItem('token',response.token);
        this.router.navigate(['']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
