import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/_models/card.model';
import { Deck } from 'src/app/_models/deck.model';
import { DeckService } from 'src/app/_services/desk.services';
import { TitlePageComponent } from 'src/shared/title-page/title-page.component';

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
export class DeckListComponent implements OnInit, OnDestroy {

    deckSubscription!: Subscription;

    deckId: string = '';
    decks: Deck[] = [];
    deck: Deck = new Deck();

    cardDetails!: Card;

    isDrawerOpen: boolean = false;
    showModal: boolean = false;
    showModalCard: boolean = false;

    typeTranslations: { [key: string]: string } = {
        'Colorless': 'Incoloro',
        'Darkness': 'Oscuridad',
        'Dragon': 'Dragon',
        'Fairy': 'Hada',
        'Fighting': 'Lucha',
        'Fire': 'Fuego',
        'Grass': 'Planta',
        'Lightning': 'Rayo',
        'Metal': 'Metal',
        'Psychic': 'Psiquico',
        'Water': 'Agua',
        'Unown': 'Unown'
    };

    typeColors: { [key: string]: string } = {
        'Colorless': '#A8A878',
        'Darkness': '#705848',
        'Dragon': '#7038F8',
        'Fairy': '#EE99AC',
        'Fighting': '#C03028',
        'Fire': '#F08030',
        'Grass': '#78C850',
        'Lightning': '#F8D030',
        'Metal': '#B8B8D0',
        'Psychic': '#F85888',
        'Water': '#6890F0',
        'Unown': '#68A090'
    };

    typeIcons: { [key: string]: string } = {
        'Colorless': '\u2B50',
        'Darkness': '\uD83C\uDF11',
        'Dragon': '\uD83D\uDC09',
        'Fairy': '\uD83E\uDDDA',
        'Fighting': '\uD83D\uDC4A',
        'Fire': '\uD83D\uDD25',
        'Grass': '\uD83C\uDF3F',
        'Lightning': '\u26A1',
        'Metal': '\u2699\uFE0F',
        'Psychic': '\uD83D\uDD2E',
        'Water': '\uD83D\uDCA7',
        'Unown': '\u2753'
    };

    constructor(private deckService: DeckService) { }

    ngOnInit(): void {
        this.getList();
    }

    ngOnDestroy(): void {
        if (this.deckSubscription) {
            this.deckSubscription.unsubscribe();
        }
    }

    getList(): void {
        this.deckSubscription = this.deckService.getDeck().subscribe(deck => {
            if (deck && deck.length > 0) {
                this.decks = deck;
            } else {
                this.decks = [];
            }
        });
    }

    toggleModal(): void {
        this.showModal = !this.showModal;
    }

    deleteDeck(deckId: string): void {
        this.deckService.deleteDeck(deckId);
        this.toggleModal();
    }

    deleteConfirm(deckId: string): void {
        this.deckId = deckId;
        this.toggleModal();
    }

    toggleDrawer(): void {
        this.isDrawerOpen = !this.isDrawerOpen;
    }

    detailDeck(deck: Deck): void {
        this.deck = deck;
        this.toggleDrawer();
    }

    toggleModalDetails(): void {
        this.showModalCard = !this.showModalCard;
    }

    getDetails(item: Card): void {
        this.cardDetails = item;
        this.toggleModalDetails();
    }

    translateType(type: string): string {
        return this.typeTranslations[type] || type;
    }

    getTypeIcon(type: string): string {
        return this.typeIcons[type] || this.typeIcons['Unown'];
    }

    getDominantType(deck: Deck): string {
        if (!deck.cards || deck.cards.length === 0) {
            return 'Unown';
        }

        const typesCount: { [key: string]: number } = {};

        deck.cards.forEach(card => {
            if (card.types && card.types.length > 0) {
                card.types.forEach(type => {
                    typesCount[type] = (typesCount[type] || 0) + 1;
                });
            }
        });

        const sortedTypes = Object.entries(typesCount).sort((a, b) => b[1] - a[1]);

        return sortedTypes[0]?.[0] || 'Unown';
    }

    getDeckTypeColor(deck: Deck): string {
        return this.typeColors[this.getDominantType(deck)] || this.typeColors['Unown'];
    }

    getDeckCardBackground(deck: Deck): string {
        const color = this.getDeckTypeColor(deck);
        return `linear-gradient(160deg, ${color}30 0%, ${color}18 42%, #ffffff 100%)`;
    }

    getDeckTextColor(deck: Deck): string {
        const dominantType = this.getDominantType(deck);
        return ['Darkness', 'Dragon', 'Fighting', 'Psychic'].includes(dominantType) ? '#ffffff' : '#1f2937';
    }

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

    // CAMBIO TCGdex: usa "category" en vez de "supertype"
    getSupertypesWithCount(): { [key: string]: number } {
        if (!this.deck || !this.deck.cards || this.deck.cards.length === 0) {
            return {};
        }
        let supertypesCount: { [key: string]: number } = {};
        this.deck.cards.forEach(card => {
            if (card.category) {
                supertypesCount[card.category] = (supertypesCount[card.category] || 0) + 1;
            }
        });
        return supertypesCount;
    }
}
