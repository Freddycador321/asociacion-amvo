import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments.prod';
import { Equipo } from '../models/equipo';   // ✅ Importar tu modelo

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  base = environment.base;

  constructor(private http: HttpClient) { }

  // ✅ Listar todos los equipos
  listar(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.base}equipo`);
  }

  // ✅ Buscar un equipo por ID
  buscar(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.base}equipo/` + id);
  }

  // ✅ Crear nuevo equipo
  nuevo(form: Equipo): Observable<Equipo[]> {
    return this.http.post<Equipo[]>(`${this.base}equipo`, form);
  }

  // ✅ Eliminar equipo
  eliminar(id: number): Observable<Equipo[]> {
    return this.http.delete<Equipo[]>(`${this.base}equipo/` + id);
  }

  // ✅ Actualizar equipo
  actualizar(id: number, form: Equipo): Observable<Equipo[]> {
    return this.http.put<Equipo[]>(`${this.base}equipo/` + id, form);
  }

  // ✅ Subir imagen (si tu equipo tiene fotos)
  subirImagen(file: File, nombre: string): Observable<any> {
    const fd = new FormData();
    fd.append('image', file, nombre);
    return this.http.post(this.base + 'equipo/imagen', fd);
  }

  // ✅ Cargar imagen
  cargar(nombre: string): Observable<any> {
    return this.http.get(`${this.base}equipo/imagen/` + nombre);
  }
}
