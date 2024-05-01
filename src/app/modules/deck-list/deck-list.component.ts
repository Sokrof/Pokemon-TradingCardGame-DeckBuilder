import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/_models/card.model';
import { Deck } from 'src/app/_models/deck.model';
import { DeckService } from 'src/app/_services/desk.services';
import { TitlePageComponent } from 'src/shared/title-page/title-page.component';

// Componente encargado de gestionar la lista de mazos.
@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TitlePageComponent,
    RouterLink
  ]
})

// Suscripción al servicio de mazos.
export class DeckListComponent implements OnInit, OnDestroy {

  deckSubscription!: Subscription;

  deckId: string = '';  // Identificador del mazo
  decks: Deck[] = [];  // Lista de mazos.
  deck: Deck = new Deck();  // Mazo seleccionado.

  cardDetails!: Card;  // Detalles de la carta seleccionada.

  isDrawerOpen: boolean = false;  // Indica si el cajón lateral está abierto.
  showModal: boolean = false;  // Indica si se muestra el modal de confirmación para eliminar un mazo.
  showModalCard: boolean = false;  // Indica si se muestra el modal con los detalles de una carta.

  constructor(private deckService: DeckService) { }


  // Método que se ejecuta al inicializarse el componente.
  ngOnInit(): void {
    this.getList();
  }

 // Método que se ejecuta al destruirse el componente.
  ngOnDestroy(): void {
    if (this.deckSubscription) {
      this.deckSubscription.unsubscribe();
    }
  }

  // Obtiene la lista de mazos
  getList(): void {
    this.deckSubscription = this.deckService.getDeck().subscribe(deck => {
      if (deck && deck.length > 0) {
        this.decks = deck;
      } else {
        this.decks = [];
      }
    });
  }

  // Alternar la visibilidad del modal de confirmación de eliminación
  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  // Elimina un mazo dado su ID
  deleteDeck(deckId: string): void {
    this.deckService.deleteDeck(deckId);
    this.toggleModal();
  }

  // Muestra el modal de confirmación de eliminación de un mazo
  deleteConfirm(deckId: string): void {
    this.deckId = deckId;
    this.toggleModal();
  }

  // Alternar la visibilidad del drawer
  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  // Muestra los detalles de un mazo específico
  detailDeck(deck: Deck): void {
    this.deck = deck;
    this.toggleDrawer();
  }

  // Alternar la visibilidad del modal de detalles de la carta
  toggleModalDetails(): void {
    this.showModalCard = !this.showModalCard;
  }

  // Obtiene los detalles de una carta específica
  getDetails(item: Card): void {
    this.cardDetails = item;
    this.toggleModalDetails();
  }

  // Obtiene el número de tipos únicos en un mazo
  getNumberOfUniqueTypes(): number {
    if (!this.deck || !this.deck.cards || this.deck.cards.length === 0) {
      return 0;
    }

    let uniqueTypes = new Set<string>();

    this.deck.cards.forEach(card => {
      if (card.types) {
        card.types.forEach(type => {
          uniqueTypes.add(type);
        });
      }
    });

    return uniqueTypes.size;
  }

  // Obtiene los tipos con su respectivo conteo en un mazo
  getTypesWithCount(): { [key: string]: number } {
    if (!this.deck || !this.deck.cards || this.deck.cards.length === 0) {
      return {};
    }

    let typesCount: { [key: string]: number } = {};

    this.deck.cards.forEach(card => {
      if (card.types) {
        card.types.forEach(type => {
          typesCount[type] = (typesCount[type] || 0) + 1;
        });
      }
    });

    return typesCount;
  }

  // Obtiene los supertipos con su respectivo conteo en un mazo
  getSupertypesWithCount(): { [key: string]: number } {
    if (!this.deck || !this.deck.cards || this.deck.cards.length === 0) {
      return {};
    }

    let supertypesCount: { [key: string]: number } = {};

    this.deck.cards.forEach(card => {
      if (card.supertype) {
        supertypesCount[card.supertype] = (supertypesCount[card.supertype] || 0) + 1;
      }
    });

    return supertypesCount;
  }
}
