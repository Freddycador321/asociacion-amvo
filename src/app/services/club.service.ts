import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from '../models/club';
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
export class ClubService {
base=environment.base
  constructor( private http:HttpClient) { }
  listar():Observable<Club[]>{
    return this.http.get<Club[]>(`${this.base}club`,httpOptions);
  }
  buscar(id:number):Observable<Club>{
    return this.http.get<Club>(`${this.base}club/`+id,httpOptions);
  }
  nuevo(form:Club):Observable<Club[]>{
    return this.http.post<Club[]>(`${this.base}club`,form,httpOptions);
  }
  eliminar(id:number):Observable<Club[]>{
    return this.http.delete<Club[]>(`${this.base}club/`+id,httpOptions);
  }
  actualizar(id:number,form:Club):Observable<Club[]>{
    return this.http.put<Club[]>(`${this.base}club/`+id, form,httpOptions);
  }
  subirImagen(file:File,nombre:string):Observable<any>{
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base+'club/imagen',fd)
  }
  cargar(nombre:string){
    return this.http.get(`${this.base}club/imagen/`+nombre,httpOptions);
  }  


}
