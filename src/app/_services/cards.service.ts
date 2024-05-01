// Importación de los módulos necesarios desde Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Importación de la configuración del entorno de producción
import { environment } from 'src/environments/environment.prod';

// Importación del servicio base
import { BaseService } from './base.service';

// Importación del modelo de tarjeta
import { Card } from '../_models/card.model';

// Decorador Injectable: Permite inyectar dependencias en este servicio
@Injectable({
  providedIn: 'root' // Indica que este servicio estará disponible en toda la aplicación
})
// Definición de la clase CardsService que extiende de BaseService
export class CardsService extends BaseService<Card> {

  // Sobrescritura de la URL base para las solicitudes de tarjetas
  override baseUrl = `${environment.apiUrl}/cards`;

  // Constructor del servicio, recibe el HttpClient para realizar solicitudes HTTP
  constructor(http: HttpClient) { 
    // Llama al constructor de la clase base (BaseService) pasándole el HttpClient
    super(http); 
  }
}
