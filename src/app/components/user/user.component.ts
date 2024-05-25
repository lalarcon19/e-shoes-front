import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/userService/user.service';
import { UserRequest, UserResponse } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authService/auth.service';
import { Token } from 'src/app/models/token';
import { jwtDecode } from 'jwt-decode';
import { PaymentService } from 'src/app/service/paymentService/payment.service';
import { CheckoutService } from 'src/app/service/checkoutService/checkout.service';
import { PaymentResponse } from 'src/app/models/payment';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    private authService: AuthService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,) {

    this.user = {} as UserResponse
    this.payment = {} as PaymentResponse
  }

  ngOnInit(): void {
    this.defineView(this.localStorageService.getToken());
    this.getAllUser();
  }

  getUserInfo() {
    this.userService.getById(this.getUserId()).subscribe(user => {
      this.user = user;
      this.payment = user.payment[0];

      if (this.payment.id === 0) {
        this.showPayment = false
      }  else {
        this.payment = this.user.payment[0]
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

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(res => {
      console.log('usuario eliminado', res);
      alert("Se elimino el usuario");
      this.router.navigate([this.path])
    },
    err=>{
      console.error('Error al eliminar el usuario')
      alert('Se produjo un error al eliminar');
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

  openEditUser():void{
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: "30%",
      height: "80%"
    })
  }


}
