import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SliderComponent } from './home/slider/slider.component';
import { LoginComponent } from './home/login/login.component';
import { AcercaDeComponent } from './home/acerca-de/acerca-de.component';
import { isLoggedInGuard } from './auth/guards/is-logged-in.guard';

const routes: Routes = [
  {
    path:'',
    // pathMatch:'full',
    loadChildren:()=>import('./home/home.module').then(h => h.HomeModule),
  },

  {
    path:'dashboard',
    loadChildren:()=>import('./dashboard/dashboard.module').then(d => d.DashboardModule),
    // data:{
    //   role:'1'
    // },
    canActivate:[isLoggedInGuard]
  },
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
