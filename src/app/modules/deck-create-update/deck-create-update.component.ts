import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { cardCountValidator, uniqueCardNameValidator } from 'src/app/_helpers/validator';
import { Card } from 'src/app/_models/card.model';
import { Deck } from 'src/app/_models/deck.model';
import { CardsService } from 'src/app/_services/cards.service';
import { DeckService } from 'src/app/_services/desk.services';
import { TypeService } from 'src/app/_services/type.services';
import { LoadingComponent } from 'src/shared/loading/loading.component';
import { TitlePageComponent } from 'src/shared/title-page/title-page.component';

@Component({
    selector: 'app-deck-create-update',
    templateUrl: './deck-create-update.component.html',
    styleUrls: ['./deck-create-update.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TitlePageComponent,
        LoadingComponent
    ]
})
export class DeckCreateUpadateComponent implements OnInit {

    form!: FormGroup;

    cards: Card[] = [];
    searchTerm: string = '';
    decks: Deck[] = [];
    types: [] = [];

    showModal: boolean = false;
    cardDetails!: Card;

    isDrawerOpen: boolean = false;
    itensDeck: Card[] = [];
    deck: Deck = new Deck();

    isLoading: boolean = false;
    formSubmitted = false;
    isDeck: boolean = false;

    deckId: string = '';

    // Variables para infinite scroll
    currentPage: number = 1;
    isLoadingMore: boolean = false;
    hasMoreCards: boolean = true;
    currentSearchType: 'all' | 'name' | 'type' = 'all';
    currentSearchValue: string = '';

    // Mapa de tipos en inglés → español
    typeTranslations: { [key: string]: string } = {
        'Colorless': 'Normal',
        'Darkness': 'Siniestro',
        'Dragon': 'Dragón',
        'Fairy': 'Hada',
        'Fighting': 'Lucha',
        'Fire': 'Fuego',
        'Grass': 'Planta',
        'Lightning': 'Rayo',
        'Metal': 'Acero',
        'Psychic': 'Psíquico',
        'Water': 'Agua',
        'Unown': 'Unown'
    };

    // Colores de cada tipo
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

    // Iconos de energía por tipo (emojis como fallback sencillo)
    typeIcons: { [key: string]: string } = {
        'Colorless': '⭐',
        'Darkness': '🌑',
        'Dragon': '🐉',
        'Fairy': '🧚',
        'Fighting': '👊',
        'Fire': '🔥',
        'Grass': '🌿',
        'Lightning': '⚡',
        'Metal': '⚙️',
        'Psychic': '🔮',
        'Water': '💧',
        'Unown': '❓'
    };

    constructor(
        private cardsService: CardsService,
        private deckService: DeckService,
        private typeService: TypeService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.deckId = this._route.snapshot.paramMap.get('id') ?? '';
        if (this.deckId) {
            this.deckService.getDeckById(this.deckId).subscribe(deck => {
                if (deck) {
                    this.deck = deck;
                    this.itensDeck = deck.cards;
                }
            });
        } else {
            this.deck = new Deck();
            this.itensDeck = [];
        }

        this.loadCard();
        this.loadTyps();
        this.buildForm();
    }

    buildForm(): void {
        this.form = this._formBuilder.group({
            name: ['', Validators.required],
            cards: [[], [cardCountValidator(2, 60), uniqueCardNameValidator()]]
        });
    }

    get f(): any {
        return this.form.controls;
    }

    // Traducir tipo al español
    translateType(type: string): string {
        return this.typeTranslations[type] || type;
    }

    // Obtener color del tipo
    getTypeColor(type: string): string {
        return this.typeColors[type] || '#888';
    }

    // Obtener icono del tipo
    getTypeIcon(type: string): string {
        return this.typeIcons[type] || '⭐';
    }

    // Contar cuántas copias de una carta hay en el mazo
    getCardCountInDeck(card: Card): number {
        return this.itensDeck.filter(c => c.name === card.name).length;
    }

    // Comprobar si se puede añadir más copias (máx 4)
    canAddCard(card: Card): boolean {
        return this.getCardCountInDeck(card) < 4;
    }

    // Añadir carta directamente (sin abrir modal)
    quickAddToDeck(card: Card, event: Event): void {
        event.stopPropagation();
        if (this.canAddCard(card)) {
            this.itensDeck.push(card);
        }
    }

    // Eliminar una copia de una carta del mazo (sin abrir modal)
    quickRemoveFromDeck(card: Card, event: Event): void {
        event.stopPropagation();
        const index = this.itensDeck.findIndex(c => c.name === card.name);
        if (index !== -1) {
            this.itensDeck.splice(index, 1);
        }
    }

    // Eliminar una copia de una carta del mazo (desde la vista del mazo)
    removeDeckCard(card: Card, event: Event): void {
        event.stopPropagation();
        const index = this.itensDeck.indexOf(card);
        if (index !== -1) {
            this.itensDeck.splice(index, 1);
        }
    }

    // El botón "Añadir Cartas" solo abre el drawer si el nombre no está vacío
    toggleDrawer(): void {
        if (!this.isDrawerOpen && !this.deck.name.trim()) {
            this.formSubmitted = true;
            return;
        }
        this.isDrawerOpen = !this.isDrawerOpen;
        if (this.isDrawerOpen) {
            this.currentPage = 1;
            this.hasMoreCards = true;
            this.currentSearchType = 'all';
            this.currentSearchValue = '';
            this.cards = [];
            this.loadCard();
        }
    }

    loadCard(): void {
        this.isLoading = true;
        this.currentPage = 1;
        this.currentSearchType = 'all';
        this.currentSearchValue = '';
        this.hasMoreCards = true;
        this.cardsService
            .loadPage(1)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe((response) => {
                this.cards = response;
                if (response.length === 0) this.hasMoreCards = false;
            });
    }

    onDrawerScroll(event: any): void {
        const element = event.target;
        const threshold = 200;
        if (element.scrollHeight - element.scrollTop - element.clientHeight < threshold) {
            this.loadMoreCards();
        }
    }

    loadMoreCards(): void {
        if (this.isLoadingMore || !this.hasMoreCards) return;

        this.isLoadingMore = true;
        this.currentPage++;

        let extraParams: { [key: string]: string } | undefined;
        if (this.currentSearchType === 'name' && this.currentSearchValue) {
            extraParams = { name: this.currentSearchValue };
        } else if (this.currentSearchType === 'type' && this.currentSearchValue) {
            extraParams = { types: this.currentSearchValue };
        }

        this.cardsService
            .loadPage(this.currentPage, 20, extraParams)
            .pipe(finalize(() => (this.isLoadingMore = false)))
            .subscribe((response) => {
                if (response.length === 0) {
                    this.hasMoreCards = false;
                } else {
                    this.cards = [...this.cards, ...response];
                }
            });
    }

    search(query: string, type?: string): void {
        this.isLoading = true;
        this.currentPage = 1;
        this.hasMoreCards = true;
        this.cards = [];

        if (type) {
            this.currentSearchType = 'type';
            this.currentSearchValue = type;
            this.cardsService.loadPage(1, 20, { types: type })
                .pipe(finalize(() => (this.isLoading = false)))
                .subscribe(
                    (response) => {
                        this.cards = response;
                        if (response.length === 0) this.hasMoreCards = false;
                    },
                    (error: any) => {
                        console.error('Error en la búsqueda de cartas:', error);
                        this.cards = [];
                    }
                );
        } else {
            this.currentSearchType = 'name';
            this.currentSearchValue = query;
            this.cardsService.loadPage(1, 20, { name: query })
                .pipe(finalize(() => (this.isLoading = false)))
                .subscribe(
                    (response) => {
                        this.cards = response;
                        if (response.length === 0) this.hasMoreCards = false;
                    },
                    (error: any) => {
                        console.error('Error en la búsqueda de cartas:', error);
                        this.cards = [];
                    }
                );
        }
    }

    filterType(type: string): void {
        this.searchTerm = '';
        this.search('', type);
    }

    onInputChange(): void {
        const searchTerm = this.searchTerm.trim();
        if (!searchTerm) {
            this.cards = [];
            this.loadCard();
        } else if (searchTerm.length >= 3) {
            this.search(this.searchTerm);
        }
    }

    loadTyps(): void {
        this.typeService
            .read()
            .subscribe((response) => {
                this.types = response;
            });
    }

    addToDeck(card: Card): void {
        if (this.canAddCard(card)) {
            this.itensDeck.push(card);
        }
        this.toggleModal();
    }

    removeFromDeckModal(card: Card): void {
        const index = this.itensDeck.findIndex(c => c.name === card.name);
        if (index !== -1) {
            this.itensDeck.splice(index, 1);
        }
        this.toggleModal();
    }

    onSubmit(): void {
        this.form.controls['cards'].setValue(this.itensDeck);
        this.formSubmitted = true;
        if (this.form.valid) {
            this.deck.cards = this.itensDeck;

            if (this.deckId !== 'null') {
                const updated = this.deckService.updateDeck(this.deck);
                if (updated) {
                    this._router.navigateByUrl('/mazos');
                }
            } else {
                const saved = this.deckService.addToDeck(this.deck);
                if (saved) {
                    this._router.navigateByUrl('/mazos');
                }
            }
        }
    }

    getList(): void {
        this.deckService.getDeck().subscribe(deck => {
            this.decks = deck;
        });
    }

    toggleModal(): void {
        this.showModal = !this.showModal;
    }

    getDetails(item: Card, deck: boolean): void {
        this.cardDetails = item;
        this.isDeck = deck;
        this.toggleModal();
    }

    deleteCartDeck(card: Card): void {
        const index = this.itensDeck.indexOf(card);
        if (index !== -1) {
            this.itensDeck.splice(index, 1);
            this.toggleModal();
        }
    }
}
