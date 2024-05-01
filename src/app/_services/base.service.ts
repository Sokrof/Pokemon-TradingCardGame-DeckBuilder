import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class BaseService<T> {

    // Define la URL base para las peticiones a la API, utilizando la configuración del entorno
    baseUrl = environment.apiUrl;

    constructor(protected http: HttpClient) { }

    // Método para obtener datos de la API
    read(): Observable<T[]> {
        // Realiza una petición HTTP GET a la URL base
        return this.http.get<{ data: T[] }>(`${this.baseUrl}`).pipe(
            // Extrae la propiedad 'data' del objeto de respuesta
            map(response => response.data),
            // Si hay un error, devuelve un observable vacío
            catchError((e: any) => {
                return EMPTY;
            })
        );
    }

    // Método para buscar datos en la API basados en una cadena de consulta
    searchCards(query: string): Observable<T[]> {
        // Define los parámetros para la consulta de búsqueda
        const params = { q: query };
        // Realiza una petición HTTP GET a la URL base con los parámetros definidos
        return this.http.get<{ data: T[] }>(this.baseUrl, { params }).pipe(
            // Extrae la propiedad 'data' del objeto de respuesta
            map(response => response.data),
            // Si hay un error, devuelve un observable vacío
            catchError((e: any) => {
                return EMPTY;
            })
        );
    }
}
