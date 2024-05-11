import { Component, OnInit  } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-shoppin-cart',
  templateUrl: './shoppin-cart.component.html',
  styleUrls: ['./shoppin-cart.component.css']
})
export class ShoppinCartComponent  implements OnInit{

  carrito: Object[] = [];
  total:number = 0;

  constructor(  ) {

  }

  ngOnInit() {


  }

  pagar_carrito(){
  }
  


}


