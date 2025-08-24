import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { environment } from 'src/environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  base=environment.base
  constructor( private http:HttpClient) { }
  listar(){
    return this.http.get<Cliente[]>(`${this.base}cliente`);
  }
  buscar(id:number){
    return this.http.get(`${this.base}cliente/`+id);
  }
  nuevo(form:Cliente):Observable<Cliente[]>{
    return this.http.post<Cliente[]>(`${this.base}cliente`,form);
  }
  eliminar(id:number):Observable<Cliente[]>{
    return this.http.delete<Cliente[]>(`${this.base}cliente/`+id);
  }
  actualizar(id:number,form:Cliente):Observable<Cliente[]>{
    return this.http.put<Cliente[]>(`${this.base}cliente/`+id, form);
  }
  subirImagen(file:File,nombre:string):Observable<any>{
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base+'cliente/imagen',fd)
  }
  cargar(nombre:string){
    return this.http.get(`${this.base}cliente/imagen/`+nombre);
  }

}
