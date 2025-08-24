import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments.prod';
import { Venta } from '../models/venta';
import { Grafico } from '../models/grafico';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  base=environment.base
  constructor( private http:HttpClient) { }
  listar():Observable<Venta[]>{
    return this.http.get<Venta[]>(`${this.base}venta`);
  }
  meses(sucursal:number,gestion:number):Observable<Grafico[][]>{
    return this.http.get<Grafico[][]>(`${this.base}venta/meses/`+sucursal+'/'+gestion);
  }
  listarRango(formulario:any):Observable<Transaccion[]>{
    return this.http.post<Transaccion[]>(`${this.base}venta/listar`,formulario,{headers:{'Authorization':''+localStorage.getItem('tokenBelen')}});
  }

  nuevo(form:any):Observable<Venta>{
    return this.http.post<Venta>(`${this.base}venta`,form,{headers:{'Authorization':''+localStorage.getItem('tokenBelen')}});
  }
  eliminar(id:number):Observable<Venta>{
    return this.http.delete<Venta>(`${this.base}venta/`+id);
  }
  actualizar(id:number,form:Venta):Observable<Venta>{
    return this.http.put<Venta>(`${this.base}venta/`+id, form);
  }
}
