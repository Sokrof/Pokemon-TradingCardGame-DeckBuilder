// Definición de la clase Card que representa una carta de Pokémon
export class Card {
    // Propiedades de la carta
    id!: number; // Identificador de la carta
    name: string = ''; // Nombre de la carta
    number: string = ''; // Número de la carta
    supertype: string = ''; // Tipo principal de la carta (por ejemplo, Pokémon, Energía, etc.)
    subtypes: string[] = []; // Subtipos de la carta (por ejemplo, 'Basic', 'Stage 1', etc.)
    hp: string = ''; // Puntos de salud de la carta
    rules: string[] = []; // Reglas asociadas con la carta
    types: string[] = []; // Tipos de la carta (por ejemplo, 'Fire', 'Water', etc.)

    // Imágenes de la carta
    images: {
        small: string; // URL de la imagen pequeña de la carta
        large: string; // URL de la imagen grande de la carta
    } = {
        small: '', // Valor predeterminado para la imagen pequeña
        large: '' // Valor predeterminado para la imagen grande
    };

    // Lista de ataques de la carta
    attacks: Attack[] = [];

    // Lista de debilidades de la carta
    weaknesses: Weakness[] = [];
}

// Interfaz que define la estructura de un ataque
export interface Attack {
    name: string; // Nombre del ataque
    text: string; // Descripción del efecto del ataque
}

// Interfaz que define la estructura de una debilidad
export interface Weakness {
    type: string; // Tipo de debilidad (por ejemplo, 'Fire', 'Water', etc.)
    value: string; // Valor de la debilidad (por ejemplo, 'x2', 'x3', etc.)
}
