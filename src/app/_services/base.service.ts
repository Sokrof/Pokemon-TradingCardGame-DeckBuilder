import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class BaseService<T> {

    // URL base de TCGdex (no necesita API key)
    baseUrl = environment.apiUrl;

    constructor(protected http: HttpClient) { }

    // Método para obtener datos de la API
    // TCGdex devuelve arrays directamente, sin wrapper "data"
    read(): Observable<T[]> {
        return this.http.get<T[]>(`${this.baseUrl}`).pipe(
            catchError((e: any) => {
                console.error('Error en la petición:', e);
                return EMPTY;
            })
        );
    }

    // Método para buscar cartas por nombre
    // TCGdex usa query params normales: ?name=pikachu
    searchCards(query: string): Observable<T[]> {
        const params = { name: query };
        return this.http.get<T[]>(this.baseUrl, { params }).pipe(
            catchError((e: any) => {
                console.error('Error en la búsqueda:', e);
                return EMPTY;
            })
        );
    }
}
