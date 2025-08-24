import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { isLoggedInGuard } from 'src/app/auth/guards/is-logged-in.guard';
import { hasRoleGuard } from 'src/app/auth/guards/has-role.guard';

const routes: Routes = [
  {path:'',component:UsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
