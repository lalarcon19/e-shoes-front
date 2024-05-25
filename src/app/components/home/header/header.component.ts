import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/models/token';
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
  userName: string = "";
  showMenu: boolean = false

  name = (name: string) => {
    let names = name.split(' ')   
    return names.length > 3 ? names[0] + " " + names[2] : names[0] + " " + names[1]  
  }


  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private authService: AuthService) {
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
      this.userName = res.name + " " + res.lastName;
    });
  }

  getUserId(): number {
    let token: Token = this.localStorageService.getTokenDecoded();
    return token.user_id
  }

}
