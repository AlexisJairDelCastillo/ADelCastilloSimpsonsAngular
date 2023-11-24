import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajesService } from '../../servicios/personajes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.css'
})
export class PersonajesComponent implements OnInit {
  characters: any[] = [];
  searchTerm: string = '';
  itemsPerPage: number = 12;
  currentPage: number = 1;
  totalItems: number = 0;

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  cargarPersonajes(): void {
    const apiUrl = `https://apisimpsons.fly.dev/api/personajes?limit=${this.itemsPerPage}&page=${this.currentPage}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then((data: any) => {
        this.characters = data.docs;
        this.totalItems = data.totalDocs;
      })
      .catch(error => console.error('Error al obtener los personajes:', error));
  }

  buscarPersonajes(): void {
    const apiUrl = `https://apisimpsons.fly.dev/api/personajes/find/${encodeURIComponent(this.searchTerm)}?limit=${this.itemsPerPage}&page=1`;

    fetch(apiUrl)
      .then(response => response.json())
      .then((data: any) => {
        this.characters = data.result;
        this.totalItems = data.totalDocs;
      })
      .catch(error => console.error('Error al buscar personajes:', error));
  }

  mostrarTodo(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.cargarPersonajes();
  }

  cambiarPagina(page: number): void {
    this.currentPage = page;
    this.cargarPersonajes();
  }

  get pages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
