import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CategoryComponent } from './components/category/category.component';
import { HeaderComponent } from './components/home/header/header.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { MenuComponent } from './components/home/menu/menu.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ShoppinCartComponent } from './components/shoppin-cart/shoppin-cart.component';
import { MonitorProductsComponent } from './components/product/monitor-products/monitor-products.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'iniciar-sesion',component:LoginComponent},
  {path:'registro',component:RegisterComponent},
  {path: 'favoritos', component:FavoriteComponent},
  {path: 'agregar-producto', component:AddProductComponent},
  {path: 'agregar-categoria', component:CategoryComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    UserComponent,
    FavoriteComponent,
    CheckoutComponent,
    CategoryComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    ShoppinCartComponent,
     MonitorProductsComponent,
     AddProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
