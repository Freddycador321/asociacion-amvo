import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.prod';
import { Item } from '../models/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  base=environment.base
  constructor( private http:HttpClient) { }
  listar(){
    return this.http.get<Item[]>(`${this.base}item`);
  }
  buscar(id:number):Observable<Item>{
    return this.http.get<Item>(`${this.base}item/`+id);
  }
  nuevo(form:Item):Observable<Item[]>{
    return this.http.post<Item[]>(`${this.base}item`,form);
  }
  eliminar(id:number):Observable<Item[]>{
    return this.http.delete<Item[]>(`${this.base}item/`+id);
  }
  actualizar(id:number,form:Item):Observable<Item[]>{
    return this.http.put<Item[]>(`${this.base}item/`+id, form);
  }
}
