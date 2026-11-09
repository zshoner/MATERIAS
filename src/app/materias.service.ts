import { Injectable } from '@angular/core';
import { Materia } from './materia.model';
import { DataServices } from './data.services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  // Arreglo local 
  listaMaterias: Materia[] = [];

  constructor(private dataServices: DataServices) {}

  // OBTENER (mapear IDs)
  obtenerMaterias(): Observable<{ [key: string]: Materia }> {
    return this.dataServices.cargarMaterias();
  }

  // Guardar en el arreglo local los datos procesados
  setMaterias(materias: Materia[]) {
    this.listaMaterias = materias;
  }

  // 2. AGREGAR MATERIA
  agregarMateria(newmateria: Materia) {
    return this.dataServices.guardarMateria(newmateria);
  }

  // 3. ACTUALIZAR MATERIA
  modificarMateria(id: string, materiaActualizada: Materia) {
    return this.dataServices.actualizarMateria(id, materiaActualizada);
  }

  // 4. ELIMINAR MATERIA
  eliminarMateria(id: string) {
    return this.dataServices.eliminarMateria(id);
  }
}