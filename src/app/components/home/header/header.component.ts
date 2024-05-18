import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/models/token';
import { UserResponse } from 'src/app/models/user';
import { AuthService } from 'src/app/service/authService/auth.service';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',]
})
export class HeaderComponent implements OnInit {
  flag: boolean = true
  user: UserResponse;
  showMenu: boolean = false


  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private authService: AuthService) {
    this.user = {} as UserResponse;
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.flag = false
    } else {
      this.flag = true
      this.getUserName()
    }
  }

  getUserName() {
    this.userService.getById(this.getUserId()).subscribe(res => {
      console.log(res);
      this.user = res;
      console.log(this.user);
      
    });
  }

  getUserId(): number {
    let token: Token = this.localStorageService.getTokenDecoded();
    return token.user_id
  }

}
