// Importación de los módulos necesarios desde Angular para trabajar con formularios
import { AbstractControl, ValidatorFn } from '@angular/forms';

// Función para validar la cantidad de cartas en un formulario
export function cardCountValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        // Obtiene la cantidad de cartas en el control
        const cardCount = control.value ? control.value.length : 0;
        // Valida si la cantidad de cartas está dentro del rango permitido
        return cardCount >= min && cardCount <= max ? null : { cardCount: true };
    };
}

// Función para validar que los nombres de las cartas sean únicos
export function uniqueCardNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        // Obtiene las cartas del control
        const cards = control.value as Array<any>;
        // Si no hay cartas o la lista está vacía, retorna válido
        if (!cards || cards.length === 0) {
            return null;
        }

        // Cuenta la cantidad de ocurrencias de cada nombre de carta
        const cardCounts = cards.reduce((counts, card) => {
            counts[card.name] = (counts[card.name] || 0) + 1;
            return counts;
        }, {});

        // Filtra los nombres de carta que se repiten más de 4 veces (máximo permitido)
        const invalidNames = Object.keys(cardCounts).filter(name => cardCounts[name] > 4);

        // Si hay nombres de cartas inválidos, retorna inválido
        return invalidNames.length > 0 ? { uniqueCardName: true } : null;
    };
}
