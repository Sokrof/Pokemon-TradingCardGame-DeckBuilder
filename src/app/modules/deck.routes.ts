// Importación de la interfaz de rutas desde Angular Router.
import { Routes } from '@angular/router';

// Importación de los componentes asociados a las rutas.
import { DeckListComponent } from './deck-list/deck-list.component';
import { DeckCreateUpadateComponent } from './deck-create-update/deck-create-update.component';

// Definición de las rutas y sus componentes asociados.
export default [
    { path: '', component: DeckListComponent }, // Ruta para mostrar la lista de mazos.
    { path: 'create/:id', component: DeckCreateUpadateComponent } // Ruta para crear o actualizar un mazo.
] as Routes;
