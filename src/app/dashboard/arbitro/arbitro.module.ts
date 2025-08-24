import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArbitroRoutingModule } from './arbitro-routing.module';
import { ArbitroComponent } from '../arbitro/arbitro.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ArbitroComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    ArbitroRoutingModule,
    FontAwesomeModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
  ]
})
export class ArbitroModule { }
