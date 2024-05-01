// Importación del decorador Injectable desde Angular
import { Injectable } from '@angular/core';

// Importación del servicio base
import { BaseService } from './base.service';

// Importación de la configuración del entorno de producción
import { environment } from 'src/environments/environment.prod';

// Importación del módulo HttpClient para realizar solicitudes HTTP
import { HttpClient } from '@angular/common/http';

// Importación de operadores RxJS para el manejo de observables
import { EMPTY, Observable, catchError, map } from 'rxjs';

// Decorador Injectable: Permite inyectar dependencias en este servicio
@Injectable({
  providedIn: 'root' // Indica que este servicio estará disponible en toda la aplicación
})
// Definición de la clase TypeService que extiende de BaseService
export class TypeService extends BaseService<any> {

  // URL base para las solicitudes de tipos de cartas
  override baseUrl = `${environment.apiUrl}/types`;

  // Constructor del servicio, recibe el HttpClient para realizar solicitudes HTTP
  constructor(http: HttpClient) {
    // Llama al constructor de la clase base (BaseService) pasándole el HttpClient
    super(http);
  }

  // Método para obtener la lista de tipos de cartas
  override read(): Observable<[]> {
    // Realiza una petición HTTP GET a la URL base
    return this.http.get<{ data: [] }>(`${this.baseUrl}`).pipe(
      // Extrae la propiedad 'data' del objeto de respuesta
      map(response => response.data),
      // Si hay un error, devuelve un observable vacío
      catchError((e: any) => {
        return EMPTY;
      })
    );
  }
}
