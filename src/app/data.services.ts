import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Materia } from './materia.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServices {
  private url = 'https://misempleados2027-default-rtdb.firebaseio.com/';

  constructor(private httpClient: HttpClient) {}

  // OBTENER MATERIAS (GET)
  cargarMaterias(): Observable<{ [key: string]: Materia }> {
    return this.httpClient.get<{ [key: string]: Materia }>(`${this.url}.json`);
  }

  // AGREGAR MATERIA 
  guardarMateria(materia: Materia): Observable<{ name: string }> {
    return this.httpClient.post<{ name: string }>(`${this.url}.json`, materia);
  }

  // EDITAR MATERIA 
  actualizarMateria(id: string, materia: Materia): Observable<Materia> {
    return this.httpClient.put<Materia>(`${this.url}/${id}.json`, materia);
  }

  // ELIMINAR 
  eliminarMateria(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}.json`);
  }
}