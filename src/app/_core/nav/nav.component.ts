// Importación de módulos y componentes desde Angular Core
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

// Importación del servicio DeckService desde la ruta correspondiente
import { DeckService } from 'src/app/_services/desk.services';

// Definición del componente NavComponent
@Component({
  // Selector que se utiliza para incrustar el componente en el HTML
  selector: 'app-nav',
  // Ruta del archivo HTML que contiene la estructura del componente
  templateUrl: './nav.component.html',
  // Lista de archivos de estilo que se aplican al componente
  styleUrls: ['./nav.component.scss'],
  // Propiedad standalone establecida como true para asegurar la independencia del componente
  standalone: true,
  // Importación de módulos y componentes adicionales (no se utiliza en Angular)
  imports: [RouterLink,NgIf]
})
export class NavComponent implements OnInit {
  // Variable para almacenar el número de barajas
  numDecks: number = 0;

  // Constructor del componente, se inyecta el servicio DeckService
  constructor(private deckService: DeckService) { }

  // Método ngOnInit que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Se suscribe al observable del servicio para obtener el número de barajas
    this.deckService.getDeck().subscribe(decks => {
      // Se actualiza el número de barajas
      this.numDecks = this.deckService.countDecks();
    });
  }
}
