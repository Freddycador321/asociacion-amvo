import { Component, OnInit } from '@angular/core';
import { faSignOut,faSignIn,faHome,faInfoCircle, faUser,faUsers,faIndustry,faDollar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  ngOnInit(): void {
  }
  constructor(){
  }
  faSignIn = faSignIn
  faHome = faHome
  faInfoCircle = faInfoCircle
  faUser=faUser
  faUsers=faUsers
  faIndustry=faIndustry
  faDollar=faDollar
  faSignOut=faSignOut
}
