import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { ShoppinCartComponent } from './components/shoppin-cart/shoppin-cart.component';
import { ProductComponent } from './components/product/product.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrate', component: RegisterComponent },
  { path: 'carrito', component: ShoppinCartComponent },
  { path: 'agregar-producto', component: AddProductComponent },
  { path: 'agregar-categoria', component: CategoryComponent },
  { path: 'productos', component: ProductComponent },
  { path: 'usuario', component: UserComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      //Rutas hijas del dashboard
      { path: 'productos', component: ProductComponent },
      { path: 'usuario', component: UserComponent },
      { path: 'category', component: CategoryComponent }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
