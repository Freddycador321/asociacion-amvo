import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './menu/menu.component';
import { MatCardModule } from '@angular/material/card';
import { PerfilComponent } from './perfil/perfil.component';
import { JugadorComponent } from './jugador/jugador.component';
import { CategoriaComponent } from './categoria/categoria.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    MenuComponent,
    PerfilComponent,
    JugadorComponent,
    CategoriaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    MatIconModule,
    MatCardModule
  ]
})
export class DashboardModule { }
