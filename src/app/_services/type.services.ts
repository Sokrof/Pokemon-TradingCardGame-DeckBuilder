// Importación del decorador Injectable desde Angular
import { Injectable } from '@angular/core';

// Importación del servicio base
import { BaseService } from './base.service';

// Importación de la configuración del entorno de producción
import { environment } from 'src/environments/environment.prod';

// Importación del módulo HttpClient para realizar solicitudes HTTP
import { HttpClient } from '@angular/common/http';

// Importación de operadores RxJS para el manejo de observables
import { EMPTY, Observable, catchError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TypeService extends BaseService<any> {

    // URL para los tipos de cartas en TCGdex
    override baseUrl = `${environment.apiUrl}/types`;

    constructor(http: HttpClient) {
        super(http);
    }

    // TCGdex devuelve un array de strings directamente: ["Colorless", "Darkness", ...]
    // No necesita map para extraer "data"
    override read(): Observable<[]> {
        return this.http.get<[]>(`${this.baseUrl}`).pipe(
            catchError((e: any) => {
                console.error('Error cargando tipos:', e);
                return EMPTY;
            })
        );
    }
}
