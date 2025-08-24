import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { SliderComponent } from './slider/slider.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {path:'',component:SliderComponent},
      {path:'login',component: LoginComponent},
      {path:'acerca',component: AcercaDeComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
