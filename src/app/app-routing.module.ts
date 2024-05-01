import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FavoriteComponent } from './components/favorite/favorite.component';


const routes: Routes = [
  {path:'iniciar-sesion',component:LoginComponent},
  {path:'registro',component:RegisterComponent},
  {path: 'favoritos', component:FavoriteComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {}
