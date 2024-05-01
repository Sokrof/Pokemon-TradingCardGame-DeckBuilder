// Importación del decorador Component y Input desde Angular Core
import { Component, Input } from '@angular/core';

// Definición del componente TitlePageComponent
@Component({
  // Selector que se utiliza para incrustar el componente en el HTML
  selector: 'app-title-page',
  // Ruta del archivo HTML que contiene la estructura del componente
  templateUrl: './title-page.component.html',
  // Propiedad standalone establecida como true para asegurar la independencia del componente
  standalone: true
})
export class TitlePageComponent {
  // Decorador Input para permitir la entrada de datos desde el componente padre
  @Input() title!: string;
}
