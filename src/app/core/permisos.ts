import { AuthService } from "../services/auth.service";

export class Permisos {
  constructor(){
    this.user=JSON.parse(localStorage.getItem('test')+"")
  }
  user:any
  isAdmin():boolean{
    return this.user.rol==1
  }
  isEncargado(){
    return this.user.rol==1||this.user.rol==2
  }
  getName():string{
    return this.user.nombre+" "+this.user.apellido
  }
  getRole():number{
    return this.user.rol
  }
}

