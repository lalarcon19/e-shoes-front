import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/service/userService/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  listUser: User[] = [];
  constructor(private userService: UserService){}

  ngOnInit(): void {}

  getAllUser(): void {
    this.userService.getAllUser().subscribe(res => {
      console.log(res);
      this.listUser = res;
    })
  }

  deleteUser(document: String):void {
    this.userService.deleteUser(document).subscribe(res => {
      console.log('user eliminado', res);
    },
    err =>{
      console.error('Error al eliminar el usuario');
    }
    );
  }
}
