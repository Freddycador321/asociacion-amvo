import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorComponent } from './proveedor.component';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormularioComponent } from './formulario/formulario.component';
import { VerComponent } from './ver/ver.component';
import { FormularioItemComponent } from './formulario-item/formulario-item.component';



@NgModule({
  declarations: [
    ProveedorComponent,
    FormularioComponent,
    VerComponent,
    FormularioItemComponent,

  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    CommonModule,
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
export class ProveedorModule { }
