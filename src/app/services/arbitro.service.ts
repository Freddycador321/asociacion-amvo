import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments.prod';
import { Arbitro } from '../models/arbitro';

@Injectable({
  providedIn: 'root'
})
export class ArbitroService {

  base=environment.base
    constructor( private http:HttpClient) { }
    listar(){
      return this.http.get<Arbitro[]>(`${this.base}arbitro`);
    }
    buscar(id:number){
      return this.http.get(`${this.base}arbitro/`+id);
    }
    nuevo(form:Arbitro):Observable<Arbitro[]>{
      return this.http.post<Arbitro[]>(`${this.base}arbitro`,form);
    }
    eliminar(id:number):Observable<Arbitro[]>{
      return this.http.delete<Arbitro[]>(`${this.base}arbitro/`+id);
    }
    actualizar(id:number,form:Arbitro):Observable<Arbitro[]>{
      return this.http.put<Arbitro[]>(`${this.base}arbitro/`+id, form);
    }
    subirImagen(file:File,nombre:string):Observable<any>{
      const fd = new FormData
      fd.append('image',file,nombre)
      return this.http.post(this.base+'arbitro/imagen',fd)
    }
    cargar(nombre:string){
      return this.http.get(`${this.base}arbitro/imagen/`+nombre);
    }
}
