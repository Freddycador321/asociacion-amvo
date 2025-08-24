import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbitroComponent } from './arbitro.component';

const routes: Routes = [
    {path:'',component:ArbitroComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArbitroRoutingModule { }
