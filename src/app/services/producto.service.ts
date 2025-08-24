import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { Inventario } from '../models/inventario';
import { environment } from 'src/environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  base=environment.base
  constructor( private http:HttpClient) { }
  listar(){
    return this.http.get<Producto[]>(`${this.base}producto`);
  }
  listarPorSucursal(id:number){
    return this.http.get<Inventario[]>(`${this.base}producto/sucursal/`+id);
  }
  listarPorVenta(id:number){
    return this.http.get<Producto[]>(`${this.base}producto/venta/`+id);
  }
  listarPorCategoria(id:number){
    return this.http.get<Producto[]>(`${this.base}producto/categoria/`+id);
  }
  buscar(id:number){
    return this.http.get<Producto>(`${this.base}producto/`+id);
  }
  buscarTodo(data:any){
    return this.http.post<any[]>(`${this.base}producto/buscar`,data);
  }
  nuevo(form:Producto):Observable<Producto[]>{
    return this.http.post<Producto[]>(`${this.base}producto`,form);
  }
  eliminar(id:number):Observable<Producto[]>{
    return this.http.delete<Producto[]>(`${this.base}producto/`+id);
  }
  actualizar(id:number,form:Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.base}producto/`+id, form);
  }
  actualizarstok(id:number,form:Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.base}producto/actualizar/`+id, form,{headers:{'Authorization':''+localStorage.getItem('tokenBelen')}});
  }
  verLog(id:number){
    return this.http.get<any[]>(`${this.base}producto/verlog/`+id, {headers:{'Authorization':''+localStorage.getItem('tokenBelen')}});
  }
  subirImagen(file:File,nombre:string):Observable<any>{
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base+'producto/imagen',fd)
  }
  cargar(nombre:string){
    return this.http.get(`${this.base}producto/imagen/`+nombre);
  }}
