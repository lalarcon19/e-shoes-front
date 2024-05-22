import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/userService/user.service';
import { UserResponse } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authService/auth.service';
import { Token } from 'src/app/models/token';
import { jwtDecode } from 'jwt-decode';
import { PaymentService } from 'src/app/service/paymentService/payment.service';
import { CheckoutService } from 'src/app/service/checkoutService/checkout.service';
import { PaymentResponse } from 'src/app/models/payment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  listUser: UserResponse[] = [];
  roles: string[] = ['ROLE_ADMIN', 'ROLE_USER'];
  user: UserResponse;
  isAdmin: boolean = false
  path: string = this.router.url;
  payment: PaymentResponse;
  show: boolean = true
  showPayment: boolean = true

  constructor(private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService) {
    this.user = {} as UserResponse
    this.payment = {} as PaymentResponse
  }

  ngOnInit(): void {
    this.defineView(this.localStorageService.getToken());
  }

  getUserInfo() {
    this.userService.getById(this.getUserId()).subscribe(user => {
      console.log(user);
      this.user = user;
      if (user.payment.id === 0) {
        this.showPayment = false
      }  else {
        this.payment = user.payment
      }
    });
  }

  getAllUser(): void {
    this.userService.getAllUser().subscribe(res => {
      console.log(res);
      this.listUser = res;
      (this.listUser.length > 0) ? this.show = false : this.show = true;
    });
  }

  paymentCreation() {
    this.router.navigate(['metodo-pago'])
    console.log("se hizo click");
  }

  getUserId(): number {
    let token: Token = this.localStorageService.getTokenDecoded();
    return token.user_id
  }

  deleteUser(document: String): void {
    this.userService.deleteUser(document).subscribe(res => {
      console.log(res);
    });
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(['inicio'])
  }

  defineView(token: string): void {
    let role = this.decodeJwt(token);

    if (role === this.roles[0] && this.path != '/usuario') {
      this.isAdmin = true
      this.getAllUser()
    } else {
      this.getUserInfo()
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
