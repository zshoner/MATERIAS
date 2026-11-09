import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaMateriasComponent } from './lista-materias/lista-materias';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListaMateriasComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'CRUD Materias';
}
