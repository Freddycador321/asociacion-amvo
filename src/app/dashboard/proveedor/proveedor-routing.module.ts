import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorComponent } from './proveedor.component';
import { VerComponent } from './ver/ver.component';

const routes: Routes = [

    {path:'',component:ProveedorComponent},
    {path:'ver/:id',component:VerComponent}

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
