import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':''+localStorage.getItem('tokenBelen')
  })
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  base=environment.base
  constructor( private http:HttpClient) { }
  listar():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.base}usuario`,httpOptions);
  }
  buscar(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.base}usuario/`+id,httpOptions);
  }
  nuevo(form:Usuario):Observable<Usuario[]>{
    return this.http.post<Usuario[]>(`${this.base}usuario`,form,httpOptions);
  }
  eliminar(id:number):Observable<Usuario[]>{
    return this.http.delete<Usuario[]>(`${this.base}usuario/`+id,httpOptions);
  }
  actualizar(id:number,form:Usuario):Observable<Usuario[]>{
    return this.http.put<Usuario[]>(`${this.base}usuario/`+id, form,httpOptions);
  }
  subirImagen(file:File,nombre:string):Observable<any>{
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base+'usuario/imagen',fd)
  }
  cargar(nombre:string){
    return this.http.get(`${this.base}usuario/imagen/`+nombre,httpOptions);
  }
}
