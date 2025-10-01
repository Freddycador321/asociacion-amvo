import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { isLoggedInGuard } from '../auth/guards/is-logged-in.guard';
import { hasRoleGuard } from '../auth/guards/has-role.guard';
import { DashboardComponent } from './dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path:'',component:DashboardComponent,
    children:[
      {path:'',component:HomeComponent},
      {
        path:'usuario',
        canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2']
        },
        loadChildren:()=>import('./usuario/usuario.module').then(u => u.UsuarioModule),
      },
      {
        path:'cliente',
        canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2','3']
        },
        loadChildren:()=>import('./cliente/cliente.module').then(c => c.ClienteModule),
      },
      {
        path:'proveedor',
        canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2']
        },
        loadChildren:()=>import('./proveedor/proveedor.module').then(p => p.ProveedorModule),
      },
      // {
      //   path:'almacen',
      //   canActivate:[isLoggedInGuard ,hasRoleGuard],
      //   data:{
      //     allowedRoles:['1','2','3']
      //   },
      //   //loadChildren:()=>import('./almacen/almacen.module').then(a => a.AlmacenModule),
      // },
      {
        path:'venta',
        canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2','3']
        },
        loadChildren:()=>import('./venta/venta.module').then(v => v.VentaModule),
      },
      {
        path:'arbitro',
        canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2','3']
        },
        loadChildren:()=>import('./arbitro/arbitro.module').then(c => c.ArbitroModule),
      },
            {
        path:'jugador',
        canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2','3']
        },
        loadChildren:()=>import('./jugador/jugaror.module').then(c => c.JugarorModule),
      },
              {
        path:'categoria',
        canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2','3']
        },
        loadChildren:()=>import('./categoria/categoria.module').then(c => c.CategoriaModule),
      },
              {
        path:'equipo',
        canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2','3']
        },
        loadChildren:()=>import('./equipo/equipo.module').then(c => c.EquipoModule),
      },
              {
        path:'club',
        canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2','3']
        },
        loadChildren:()=>import('./club/club.module').then(c => c.ClubModule),
      },
    ]
  },
  {path:'perfil',
    canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2','3']
    },
    component:PerfilComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
