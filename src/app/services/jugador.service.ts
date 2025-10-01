import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments.prod';
import { Jugador } from '../models/jugador';

@Injectable({
  providedIn: 'root'
})
export class jugadorService {

  base=environment.base
    constructor( private http:HttpClient) { }
    listar(){
      return this.http.get<Jugador[]>(`${this.base}jugador`);
    }
    buscar(id:number){
      return this.http.get(`${this.base}jugador/`+id);
    }
    nuevo(form:Jugador):Observable<Jugador[]>{
      return this.http.post<Jugador[]>(`${this.base}jugador`,form);
    }
    eliminar(id:number):Observable<Jugador[]>{
      return this.http.delete<Jugador[]>(`${this.base}jugador/`+id);
    }
    actualizar(id:number,form:Jugador):Observable<Jugador[]>{
      return this.http.put<Jugador[]>(`${this.base}jugador/`+id, form);
    }
    subirImagen(file:File,nombre:string):Observable<any>{
      const fd = new FormData
      fd.append('image',file,nombre)
      return this.http.post(this.base+'jugador/imagen',fd)
    }
    cargar(nombre:string){
      return this.http.get(`${this.base}jugador/imagen/`+nombre);
    }
}
