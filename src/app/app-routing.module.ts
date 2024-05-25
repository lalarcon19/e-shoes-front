import { NgModule } from '@angular/core';
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
import { CreatePaymentComponent } from './components/payments/create-payment/create-payment.component';
import { MonitorProductsComponent } from './components/product/monitor-products/monitor-products.component';


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'carrito', component: ShoppinCartComponent },
  { path: 'agregar-producto', component: AddProductComponent },
  { path: 'agregar-categoria', component: CategoryComponent },
  { path: 'productos', component: ProductComponent },
  { path: 'usuario', component: UserComponent },
  { path: 'metodo-pago', component: CreatePaymentComponent },
  { path: 'favoritos', component: FavoriteComponent },
  { path: 'tabla-productos', component: MonitorProductsComponent},

  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      //Rutas hijas del dashboard
      { path: 'productos', component: ProductComponent},
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
