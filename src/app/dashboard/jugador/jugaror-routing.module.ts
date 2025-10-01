import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugadorComponent } from './jugador.component';
import { ImprimirComponent } from './imprimir/imprimir.component';

const routes: Routes = [  {path:'',component:JugadorComponent},{path:'imprimir',component:ImprimirComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugarorRoutingModule { }
