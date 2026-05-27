import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { BaseService } from './base.service';
import { Card } from '../_models/card.model';

@Injectable({
    providedIn: 'root'
})
export class CardsService extends BaseService<Card> {

    override baseUrl = `${environment.apiUrl}/cards`;

    constructor(http: HttpClient) {
        super(http);
    }

    private mapToCard(data: any): Card {
        const card = new Card();
        card.id = data.id || '';
        card.name = data.name || '';
        card.number = data.localId || '';
        card.category = data.category || '';
        card.subtypes = data.subtypes || [];
        card.hp = data.hp || 0;
        card.types = data.types || [];
        card.stage = data.stage || '';
        card.description = data.description || '';
        card.image = data.image || '';
        card.attacks = (data.attacks || []).map((a: any) => ({
            name: a.name || '',
            effect: a.effect || '',
            damage: a.damage || '',
            cost: a.cost || []
        }));
        card.weaknesses = (data.weaknesses || []).map((w: any) => ({
            type: w.type || '',
            value: w.value || ''
        }));
        return card;
    }

    // Carga una página concreta de cartas (para infinite scroll)
    loadPage(page: number, itemsPerPage: number = 20, extraParams?: { [key: string]: string }): Observable<Card[]> {
        let params: { [key: string]: string } = {
            'pagination:page': page.toString(),
            'pagination:itemsPerPage': itemsPerPage.toString()
        };
        if (extraParams) {
            params = { ...params, ...extraParams };
        }
        return this.http.get<any[]>(this.baseUrl, { params }).pipe(
            switchMap((briefCards: any[]) => {
                if (!briefCards || briefCards.length === 0) return of([]);
                const detailRequests = briefCards.map(card =>
                    this.http.get<any>(`${this.baseUrl}/${card.id}`).pipe(
                        catchError(() => of(null))
                    )
                );
                return forkJoin(detailRequests).pipe(
                    map(cards => cards
                        .filter((c): c is any => c !== null)
                        .map(c => this.mapToCard(c))
                        .filter(c => c.image !== '')
                    )
                );
            }),
            catchError((e: any) => {
                console.error('Error cargando página:', e);
                return of([]);
            })
        );
    }

    // Mantener read() para compatibilidad - carga la primera página
    override read(): Observable<Card[]> {
        return this.loadPage(1);
    }

    override searchCards(query: string): Observable<Card[]> {
        return this.loadPage(1, 20, { name: query });
    }

    searchByType(type: string): Observable<Card[]> {
        return this.loadPage(1, 20, { types: type });
    }
}
