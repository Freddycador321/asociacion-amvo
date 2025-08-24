import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private router:Router,
    private authServicio:AuthService,
    private toastr:ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      let usuarioActual=this.authServicio.usuarioActualValue
      if (usuarioActual){

        let token:string=usuarioActual.token+""
        let payload:string = token.split('.')[1];
        const value =atob(payload);
        const json=JSON.parse(value);
        const now=Math.floor(Date.now()/1000);
        if(json.exp>=now){
          request = request.clone({
            setHeaders: {
              authorization: `Bearer ${ token }`
            }
          });
        }
        else{
          localStorage.clear()
          this.toastr.warning('Expiro su tiempo de Sesion','Atencion');
          this.router.navigateByUrl("/");

        }
    }
    return next.handle(request);
  }
}
