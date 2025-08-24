import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ImgRotaDirective } from 'src/app/img-rota.directive';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { HistorialComponent } from './historial/historial.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { EstadisticosComponent } from './estadisticos/estadisticos.component';
import { VentaRoutingModule } from './venta-routing.module';
import { AuthInterceptorInterceptor } from 'src/app/auth-interceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ClienteComponent } from './transaccion/cliente/cliente.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { DetalleComponent } from './historial/detalle/detalle.component';
import {MatMenuModule} from '@angular/material/menu';

registerLocaleData(localeEs,'es')
@NgModule({
  declarations: [
    HistorialComponent,
    TransaccionComponent,
    ClienteComponent,
    EstadisticosComponent,
    DetalleComponent,
  ],
  imports: [
    CommonModule,
    VentaRoutingModule,
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
    MatMenuModule,
    // MatAutocompleteModule,
    // MatSlideToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    // NgFor,
    // MatSlideToggleModule,
    // AsyncPipe,
    MatCardModule,
    NgxChartsModule,
    MatPaginatorModule,
    // NgIf,
    // MatProgressSpinnerModule,
    // MatTableModule,
    // MatSortModule,
    // MatPaginatorModule,
    // DatePipe,
    MatDatepickerModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true},
    {provide:LOCALE_ID,useValue:'es'}
  ],
})
export class VentaModule { }
