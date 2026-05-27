// Definición de la clase Card que representa una carta de Pokémon
// Adaptada para la API de TCGdex (https://tcgdex.dev)
export class Card {
    // Propiedades de la carta
    id!: string; // Identificador de la carta (ej: "swsh3-136")
    name: string = ''; // Nombre de la carta
    number: string = ''; // Número de la carta (localId en TCGdex)
    category: string = ''; // Categoría de la carta: "Pokemon", "Trainer", "Energy" (antes supertype)
    subtypes: string[] = []; // Subtipos de la carta
    hp: number = 0; // Puntos de salud de la carta (TCGdex usa number, no string)
    rules: string[] = []; // Reglas asociadas con la carta
    types: string[] = []; // Tipos de la carta (ej: "Fire", "Water")
    stage: string = ''; // Etapa del Pokémon: "Basic", "Stage1", "Stage2"
    description: string = ''; // Descripción de la carta

    // Imagen de la carta (TCGdex usa una sola URL base, sin extensión)
    // Para mostrar la imagen, añadir "/high.webp" o "/low.webp" al final
    image: string = '';

    // Propiedad computada para compatibilidad con los templates que usan images.small
    get images(): { small: string; large: string } {
        return {
            small: this.image ? `${this.image}/low.webp` : '',
            large: this.image ? `${this.image}/high.webp` : ''
        };
    }

    // Lista de ataques de la carta
    attacks: Attack[] = [];

    // Lista de debilidades de la carta
    weaknesses: Weakness[] = [];
}

// Interfaz que define la estructura de un ataque (TCGdex usa "effect" en vez de "text")
export interface Attack {
    name: string; // Nombre del ataque
    effect: string; // Descripción del efecto del ataque (en TCGdex es "effect", no "text")
    damage: number | string; // Daño del ataque
    cost: string[]; // Coste de energía del ataque
}

// Interfaz que define la estructura de una debilidad
export interface Weakness {
    type: string; // Tipo de debilidad (ej: "Fire", "Water")
    value: string; // Valor de la debilidad (ej: "×2")
}
