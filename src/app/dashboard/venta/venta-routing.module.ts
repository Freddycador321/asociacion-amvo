import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { HistorialComponent } from './historial/historial.component';
import { EstadisticosComponent } from './estadisticos/estadisticos.component';

const routes: Routes = [
  {path:'transaccion',component:TransaccionComponent},
  {path:'historial',component:HistorialComponent},
  {path:'estadistico',component:EstadisticosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
