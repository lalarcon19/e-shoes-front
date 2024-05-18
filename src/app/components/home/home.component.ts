import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  flag: boolean = true

  ngOnInit(): void {
      if(false) {
        this.flag = false
        window.location.reload();
      } else {
        this.flag = true
      }
  }

}
