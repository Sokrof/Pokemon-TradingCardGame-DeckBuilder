// Importación del decorador Injectable desde Angular
import { Injectable } from '@angular/core';

// Importación de BehaviorSubject y map desde RxJS para la gestión de flujos de datos
import { BehaviorSubject, map } from 'rxjs';

// Importación de Observable desde RxJS para la creación de observables
import { Observable } from 'rxjs';

// Importación del modelo Deck
import { Deck } from '../_models/deck.model';

// Importación de la función uuidv4 desde la librería uuid para la generación de identificadores únicos
import { v4 as uuidv4 } from 'uuid';

// Decorador Injectable: Permite inyectar dependencias en este servicio
@Injectable({
    providedIn: 'root' // Indica que este servicio estará disponible en toda la aplicación
})
// Definición de la clase DeckService
export class DeckService {
    // Variable privada para almacenar las barajas
    private deck: Deck[] = [];

    // BehaviorSubject para emitir y mantener el estado actual de las barajas
    private deckSubject = new BehaviorSubject<Deck[]>([]);

    // Constructor del servicio
    constructor() { }

    // Método para agregar una baraja al servicio
    addToDeck(deck: Deck): boolean {
        // Genera un identificador único para la baraja
        deck.id = uuidv4();
        // Agrega la baraja al arreglo de barajas
        this.deck.push(deck);
        // Emite el nuevo estado del arreglo de barajas a través del BehaviorSubject
        this.deckSubject.next([...this.deck]);
        // Retorna true para indicar que la operación se realizó con éxito
        return true;
    }

    // Método para obtener una baraja
    getDeck(): Observable<Deck[]> {
        // Retorna un observable que emite el estado actual del arreglo de barajas
        return this.deckSubject.asObservable();
    }

    // Método para obtener una baraja por su ID
    getDeckById(deckId: string): Observable<Deck | undefined> {
        // Retorna un observable que emite la baraja con el ID especificado
        return this.deckSubject.asObservable().pipe(
            map(decks => decks.find(deck => deck.id === deckId))
        );
    }

    // Método para actualizar una baraja
    updateDeck(deck: Deck): boolean {
        // Busca la baraja en el arreglo por su ID
        const index = this.deck.findIndex(d => d.id === deck.id);
        // Si la baraja se encuentra
        if (index !== -1) {
            // Reemplaza la baraja existente con la nueva baraja
            this.deck[index] = { ...deck };
            // Emite el nuevo estado del arreglo de barajas a través del BehaviorSubject
            this.deckSubject.next([...this.deck]);
            // Retorna true para indicar que la operación se realizó con éxito
            return true;
        } else {
            // Retorna false si la baraja no se encontró
            return false;
        }
    }

    // Método para eliminar una baraja
    deleteDeck(deckId: string): void {
        // Busca la baraja en el arreglo por su ID
        const index = this.deck.findIndex(deck => deck.id === deckId);
        // Si la baraja se encuentra
        if (index !== -1) {
            // Elimina la baraja del arreglo
            this.deck.splice(index, 1);
            // Emite el nuevo estado del arreglo de barajas a través del BehaviorSubject
            this.deckSubject.next([...this.deck]);
        }
    }

    // Método para contar el número de barajas
    countDecks(): number {
        // Retorna la longitud del arreglo de barajas
        return this.deck.length;
    }
}
