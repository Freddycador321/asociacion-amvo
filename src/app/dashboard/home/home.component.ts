import { Component } from '@angular/core';
import { Permisos } from 'src/app/core/permisos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  permisos=new Permisos()
}
