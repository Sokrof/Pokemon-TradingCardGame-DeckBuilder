// Importación del modelo Card para representar las cartas en una baraja
import { Card } from "./card.model";

// Definición de la clase Deck que representa una baraja de cartas
export class Deck {
    // Propiedades de la baraja
    id: string = ''; // Identificador único de la baraja
    name: string = ''; // Nombre de la baraja
    image: string = 'assets/mazo.png'; // Imagen por defecto de la baraja
    cards: Card[] = []; // Lista de cartas que componen la baraja
}
