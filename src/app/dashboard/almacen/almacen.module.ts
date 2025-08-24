import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AlmacenRoutingModule } from './almacen-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CategoriaComponent } from './categoria/categoria.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { SucursalformularioComponent } from './sucursal/sucursalformulario/sucursalformulario.component';
import { ImgRotaDirective } from 'src/app/img-rota.directive';
import { CategoriaformularioComponent } from './categoria/categoriaformulario/categoriaformulario.component';
import { ProductoformularioComponent } from './producto/productoformulario/productoformulario.component';
import { ProductoComponent } from './producto/producto.component';
import { InventarioComponent } from './inventario/inventario.component';
import { RegistrarComponent } from './inventario/registrar/registrar.component';
import localeEs from '@angular/common/locales/es';
import { ProductoSucursalComponent } from './producto-sucursal/producto-sucursal.component'
import {ScrollingModule} from '@angular/cdk/scrolling';
import { VerProductoLogComponent } from './inventario/ver-producto-log/ver-producto-log.component';

registerLocaleData(localeEs,'es')


@NgModule({
  declarations: [
    CategoriaComponent,
    ProductoComponent,
    SucursalComponent,
    InventarioComponent,
    SucursalformularioComponent,
    CategoriaformularioComponent,
    ProductoformularioComponent,
    ImgRotaDirective,
    RegistrarComponent,
    ProductoSucursalComponent,
    VerProductoLogComponent,
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
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
    ScrollingModule,
  ],
  providers:[
    {provide:LOCALE_ID,useValue:'es'}
  ]
})
export class AlmacenModule { }
