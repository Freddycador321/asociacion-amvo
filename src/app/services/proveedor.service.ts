import { Injectable } from '@angular/core';
import { Proveedor } from '../models/proveedor';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments.prod';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  base=environment.base
  constructor( private http:HttpClient) { }
  listar(){
    return this.http.get<Proveedor[]>(`${this.base}proveedor`);
  }
  listarPorVenta(id:number){
    return this.http.get<Proveedor[]>(`${this.base}proveedor/venta/`+id);
  }
  listarPorCategoria(id:number){
    return this.http.get<Proveedor[]>(`${this.base}proveedor/categoria/`+id);
  }
  buscar(id:number):Observable<[Proveedor,Producto[]]>{
    return this.http.get<[Proveedor,Producto[]]>(`${this.base}proveedor/`+id);
  }
  buscarTodo(data:string){
    return this.http.post<any[]>(`${this.base}proveedor/buscar`,data);
  }
  nuevo(form:Proveedor):Observable<Proveedor[]>{
    return this.http.post<Proveedor[]>(`${this.base}proveedor`,form);
  }
  eliminar(id:number):Observable<Proveedor[]>{
    return this.http.delete<Proveedor[]>(`${this.base}proveedor/`+id);
  }
  actualizar(id:number,form:Proveedor):Observable<Proveedor[]>{
    return this.http.put<Proveedor[]>(`${this.base}proveedor/`+id, form);
  }
}
