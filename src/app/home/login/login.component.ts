import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  fieldTextType=false
  constructor(private AuthServicio:AuthService,private toastr:ToastrService,private router:Router){}
  formulario=new FormGroup({
    password: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
  })
  get password(){return this.formulario.get('password')}
  get username(){return this.formulario.get('username')}
  error_password():string{
    if(this.password?.hasError('required'))
      return "Campo Obligatorio"
    if(this.username?.hasError('minlength'))
      return "Ingrese minimo 8 caracteres"
    return ""
  }
  error_cuenta():string{
    if(this.username?.hasError('required'))
      return "Campo Obligatorio"
    if(this.username?.hasError('minlength'))
      return "Ingrese minimo 4 caracteres"
    if(this.username?.hasError('pattern'))
      return "Ingrese letras y/o numeros"
    return ""
  }
  dataSubscription: Subscription;

  onLogin():void{
    localStorage.clear()
    let form:Login={password:"",username:""}
    form.password=this.password?.value+""
    form.username=this.username?.value+""
    localStorage.clear();
    this.dataSubscription=this.AuthServicio.login(form).subscribe(data=>{
      this.toastr.success("Haz iniciado Sesion",'En hora buena!');
      this.router.navigate(['/dashboard'])
    },
    error=>{
      if(error.status==400)
        this.toastr.error('Cuenta y/o clave incorrecta','Error')
      if(error.status==500)
        this.toastr.error('Consulte con el Ing. a cargo','Error')
    })
  }
  ngOnDestroy(): void {
    if(this.dataSubscription)
    this.dataSubscription.unsubscribe()
  }
}
