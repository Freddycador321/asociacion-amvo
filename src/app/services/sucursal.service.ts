import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sucursal } from '../models/sucursal';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  base=environment.base
  constructor( private http:HttpClient) { }
  listar(){
    return this.http.get<Sucursal[]>(`${this.base}sucursal`);
  }
  buscar(id:number):Observable<Sucursal>{
    return this.http.get<Sucursal>(`${this.base}sucursal/`+id);
  }
  nuevo(form:Sucursal):Observable<Sucursal[]>{
    return this.http.post<Sucursal[]>(`${this.base}sucursal`,form);
  }
  eliminar(id:number):Observable<Sucursal[]>{
    return this.http.delete<Sucursal[]>(`${this.base}sucursal/`+id);
  }
  actualizar(id:number,form:Sucursal):Observable<Sucursal[]>{
    return this.http.put<Sucursal[]>(`${this.base}sucursal/`+id, form);
  }
  subirImagen(file:File,nombre:string):Observable<any>{
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base+'sucursal/imagen',fd)
  }
  cargar(nombre:string){
    return this.http.get(`${this.base}sucursal/imagen/`+nombre);
  }
}
