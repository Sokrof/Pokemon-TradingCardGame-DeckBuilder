// Importación del decorador Component desde Angular Core
import { Component } from '@angular/core';

// Definición del componente LoadingComponent
@Component({
  // Selector que se utiliza para incrustar el componente en el HTML
  selector: 'app-loading',
  // Ruta del archivo HTML que contiene la estructura del componente
  templateUrl: './loading.component.html',
  // Lista de archivos de estilo que se aplican al componente
  styleUrls: ['./loading.component.scss'],
  // Propiedad standalone establecida como true para asegurar la independencia del componente
  standalone: true
})
export class LoadingComponent {

}
