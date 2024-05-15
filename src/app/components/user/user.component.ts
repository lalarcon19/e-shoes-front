import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/userService/user.service';
import { UserResponse } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  listUser: UserResponse[] = [];
  user: UserResponse;
  isAdmin: boolean = true
  flag: boolean = false

  constructor(private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router) {
    this.user = {} as UserResponse
  }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllUser();
  }

  getUserInfo() {
    this.userService.getById(4).subscribe(user => {
      console.log(user);
      this.user = user
    }, error => console.log(error)
    );
  }

  getAllUser(): void {
    this.userService.getAllUser().subscribe(res => {
      console.log(res);
      this.listUser = res;
    },
      error => console.log(error)
    );
  }

  deleteUser(document: String): void {
    this.userService.deleteUser(document).subscribe(res => {
      console.log(res);
    },
      err => console.error(err)
    );
  }
}
