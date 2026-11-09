import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Materia } from '../materia.model';
import { MateriasService } from '../materias.service';
import { firstValueFrom } from 'rxjs'; // Promesas

@Component({
  selector: 'app-lista-materias',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lista-materias.html',
  styleUrl: './lista-materias.css'
})
export class ListaMateriasComponent implements OnInit {
  materias: Materia[] = [];

  nombre: string = '';
  codigo: string = '';
  ciclo: string = '';
  modalidad: string = '';

  materiaSeleccionada: Materia | null = null;

  //evita la duplicacion
  guardando: boolean = false;

  constructor(
    private materiasService: MateriasService,

    // ChangeDetectorRef para forzar la detección de cambios después de actualizar la lista
    private detectorCambios: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.obtenerLista();
  }

  //LISTAR CON PROMESAS
  async obtenerLista() {
    try {
      // Promesa
      const response = await firstValueFrom(this.materiasService.obtenerMaterias());
      
      if (response) {
        this.materias = Object.keys(response).map(key => ({
          id: key,
          ...response[key]
        }));
      } else {
        this.materias = [];
      }
      this.detectorCambios.markForCheck();
    } catch (err) {
      console.error('Error al cargar materias:', err);
    }
  }

  //AGREGAR
  async agregar() {
    if (!this.nombre.trim() || !this.codigo.trim() || !this.ciclo.trim() || !this.modalidad) {
      alert('Por favor complete todos los campos, incluyendo la modalidad.');
      return;
    }

    if (this.guardando) return;
    this.guardando = true;

    const nuevaMateria: Materia = {
      nombre: this.nombre,
      codigo: this.codigo,
      ciclo: this.ciclo,
      modalidad: this.modalidad
    };

    try {
      //  Confirmamos que guardó el registro Firebase
      await firstValueFrom(this.materiasService.agregarMateria(nuevaMateria));
      this.limpiarFormulario();
      await this.obtenerLista(); // Refresh

      alert('¡La materia se ha agregado correctamente!');
    } catch (err) {
      console.error('Error al guardar:', err);
      alert('Ocurrió un error al intentar guardar la materia.');
    } finally {
      this.guardando = false;
    }
  }


  //EDITAR
  seleccionarParaEditar(materia: Materia) {
    // Clonamos el objeto para evitar modificar directamente la lista mientras se edita
    this.materiaSeleccionada = { ...materia };
  }

  //EDITAR
  async modificar() {
    if (!this.materiaSeleccionada || !this.materiaSeleccionada.id) return;

    const { nombre, codigo, ciclo, modalidad } = this.materiaSeleccionada;
    if (!nombre.trim() || !codigo.trim() || !ciclo.trim() || !modalidad) {
      alert('Por favor asegúrese de llenar todos los campos al editar.');
      return;
    }

    try {
      const id = this.materiaSeleccionada.id;
      
      await firstValueFrom(this.materiasService.modificarMateria(id, this.materiaSeleccionada));
      
      this.materiaSeleccionada = null;
      await this.obtenerLista(); // refresh
    } catch (err) {
      console.error('Error al actualizar:', err);
    }
  }

  // ELIMINAR
  async eliminar(id?: string) {
    if (!id) return;

    if (confirm('¿Está seguro de que desea eliminar esta materia?')) {
      try {
        await firstValueFrom(this.materiasService.eliminarMateria(id));
        await this.obtenerLista();//refresh
        alert('Materia eliminada correctamente.');
      } catch (err) {
        console.error('Error al eliminar:', err);
      }
    }
  }

  limpiarFormulario() {
    this.nombre = '';
    this.codigo = '';
    this.ciclo = '';
    this.modalidad = '';
  }
}