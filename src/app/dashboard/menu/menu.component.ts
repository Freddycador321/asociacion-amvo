import { Component, OnInit } from '@angular/core';
import { faSignOut,faSignIn,faHome,faInfoCircle, faUser,faUsers,faIndustry,faDollar } from '@fortawesome/free-solid-svg-icons';
import { Permisos } from 'src/app/core/permisos';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(){
  }
  isAdmin():boolean{
    return this.permisos.isAdmin()
  }
  isEncargado():boolean{
    return this.permisos.isEncargado()
  }
  getName():string{
    return this.permisos.getName()
  }
  permisos=new Permisos()
  faSignIn = faSignIn
  faHome = faHome
  faInfoCircle = faInfoCircle
  faUser=faUser
  faUsers=faUsers
  faIndustry=faIndustry
  faDollar=faDollar
  faSignOut=faSignOut
  cerrarSesion():void{
    localStorage.clear()
  }
}
