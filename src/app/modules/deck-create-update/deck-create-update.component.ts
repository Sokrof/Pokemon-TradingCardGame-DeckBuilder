import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { cardCountValidator, uniqueCardNameValidator } from 'src/app/_helpers/validator'; // Importa los validadores personalizados
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
    TitlePageComponent, // Importa el componente de título
    LoadingComponent // Importa el componente de carga
  ]
})
export class DeckCreateUpadateComponent implements OnInit {

  form!: FormGroup; // Formulario reactivo

  cards: Card[] = []; // Lista de cartas
  searchTerm: string = ''; // Término de búsqueda
  decks: Deck[] = []; // Lista de barajas
  types: [] = []; // Lista de tipos

  showModal: boolean = false; // Indica si se muestra el modal
  cardDetails!: Card; // Detalles de la carta seleccionada

  isDrawerOpen: boolean = false; // Indica si el cajón está abierto
  itensDeck: Card[] = []; // Lista de cartas en la baraja
  deck: Deck = new Deck(); // Objeto de baraja

  isLoading: boolean = false; // Indica si se está cargando
  formSubmitted = false; // Indica si el formulario ha sido enviado
  isDeck: boolean = false; // Indica si la carta está en la baraja

  deckId: string = ''; // ID de la baraja

  constructor(
    private cardsService: CardsService, // Servicio de cartas
    private deckService: DeckService, // Servicio de barajas
    private typeService: TypeService, // Servicio de tipos
    private _router: Router, // Router
    private _route: ActivatedRoute, // ActivatedRoute
    private _formBuilder: FormBuilder // FormBuilder
  ) { }

  ngOnInit(): void {
    this.deckId = this._route.snapshot.paramMap.get('id') ?? ''; // Obtiene el ID de la baraja desde la URL
    if (this.deckId) {
      this.deckService.getDeckById(this.deckId).subscribe(deck => { // Obtiene la baraja por ID
        if (deck) {
          this.deck = deck; // Asigna la baraja obtenida
          this.itensDeck = deck.cards // Asigna las cartas de la baraja
        }
      });
    } else {
      this.deck = new Deck(); // Crea una nueva baraja
      this.itensDeck = []; // Inicializa la lista de cartas de la baraja
    }

    this.loadCard(); // Carga las cartas
    this.loadTyps(); // Carga los tipos
    this.buildForm(); // Construye el formulario
  }

  // Especifica el mínimo y máximo de cartas
  buildForm(): void {
    this.form = this._formBuilder.group({
      name: ['', Validators.required], // Campo de nombre requerido
      cards: [[], [cardCountValidator(2, 60), uniqueCardNameValidator()]] // Campo de cartas con validadores personalizados
    });
  }

  get f(): any {
    return this.form.controls; // Obtiene los controles del formulario
  }

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen; // Alterna el estado del drawer
  }

  loadCard(): void {
    this.isLoading = true; // Indica que se está cargando
    this.cardsService
      .read()
      .pipe(finalize(() => (this.isLoading = false))) // Indica que se ha terminado de cargar
      .subscribe((response) => {
        this.cards = response // Asigna las cartas obtenidas
      });
  }

  search(query: string, type?: string): void {
    this.isLoading = true; // Indica que se está cargando

    let queryParams = `name:${query}`;
    if (type) {
      queryParams = ` types:${type}`;
    }

    this.cardsService.searchCards(queryParams)
      .pipe(
        finalize(() => (this.isLoading = false))) // Indica que se ha terminado de cargar
      .subscribe(
        (response) => {
          this.cards = response; // Asigna las cartas obtenidas
        },
        (error: any) => {
          console.error('Erro na busca de cartas:', error); // Registra un error en la consola
          this.cards = []; // Reinicia la lista de cartas
        }
      );
  }

  filterType(type: string): void {
    this.searchTerm = '';
    this.search('', type); // Realiza la búsqueda por tipo
  }

  onInputChange(): void {
    const searchTerm = this.searchTerm.trim();

    if (!searchTerm) {
      this.loadCard(); // Carga todas las cartas
    } else if (searchTerm.length >= 3) {
      this.search(this.searchTerm); // Realiza la búsqueda por término
    }
  }

  loadTyps(): void {
    this.typeService
      .read()
      .subscribe((response) => {
        this.types = response // Asigna los tipos obtenidos
      });
  }

  addToDeck(card: Card): void {
    this.itensDeck.push(card); // Agrega una carta a la baraja
    this.toggleModal(); // Alterna la visualización del modal
  }

  onSubmit(): void {
    this.form.controls['cards'].setValue(this.itensDeck); // Asigna las cartas seleccionadas al formulario
    this.formSubmitted = true; // Indica que se ha enviado el formulario
    if (this.form.valid) {
      this.deck.cards = this.itensDeck; // Asigna las cartas seleccionadas a la baraja

      if (this.deckId !== 'null') {
        const updated = this.deckService.updateDeck(this.deck); // Actualiza la baraja existente
        if (updated) {
          this.toggleModal(); // Alterna la visualización del modal
          this._router.navigateByUrl('/'); // Redirige a la página de inicio
        } 
      } else {
        const saved = this.deckService.addToDeck(this.deck); // Agrega una nueva baraja
        if (saved) {
          this.toggleModal(); // Alterna la visualización del modal
          this._router.navigateByUrl('/'); // Redirige a la página de inicio
        } 
      }

    }
  }

  getList(): void {
    this.deckService.getDeck().subscribe(deck => {
      this.decks = deck; // Asigna las barajas obtenidas
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal; // Alterna la visualización del modal
  }

  getDetails(item: Card, deck: boolean): void {
    this.cardDetails = item; // Asigna los detalles de la carta seleccionada
    this.isDeck = deck; // Indica si la carta está en una baraja
    this.toggleModal(); // Alterna la visualización del modal
  }

  deleteCartDeck(card: Card): void {
    const index = this.itensDeck.indexOf(card); // Obtiene el índice de la carta en la baraja
    if (index !== -1) {
      this.itensDeck.splice(index, 1); // Elimina la carta de la baraja
      this.toggleModal(); // Alterna la visualización del modal
    }
  }

}
