import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { environment } from 'src/environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  base=environment.base
  constructor( private http:HttpClient) { }
  listar(){
    return this.http.get<Categoria[]>(`${this.base}categoria`);
  }
  listarPorSucursal(id:number){
    return this.http.get<Categoria[]>(`${this.base}categoria/sucursal/`+id);
  }
  buscar(id:number){
    return this.http.get(`${this.base}categoria/`+id);
  }
  nuevo(form:Categoria):Observable<Categoria[]>{
    return this.http.post<Categoria[]>(`${this.base}categoria`,form);
  }
  eliminar(id:number):Observable<Categoria[]>{
    return this.http.delete<Categoria[]>(`${this.base}categoria/`+id);
  }
  actualizar(id:number,form:Categoria):Observable<Categoria[]>{
    return this.http.put<Categoria[]>(`${this.base}categoria/`+id, form);
  }
  subirImagen(file:File,nombre:string):Observable<any>{
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base+'categoria/imagen',fd)
  }
  cargar(nombre:string){
    return this.http.get(`${this.base}categoria/imagen/`+nombre);
  }
}
