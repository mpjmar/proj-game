import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/games';

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  getGamesByGenre(genre: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}?genre=${genre}`);
  }

  getGamesByPlatform(platform: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}?platform=${platform}`);
  }

  getGamesByFilters(genre: string, platform: string): Observable<Game[]> {
    let url = this.apiUrl;
    const params: String[] = [];

    if (genre !== 'Todos') params.push(`genre=${genre}`);
    if (platform !== 'Todas') params.push(`platform=${platform}`);

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    return this.http.get<Game[]>(url);
  }

  getGamesByTitle(title: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}?title_like=${title}`);
  }

  getGamesByQuery(query: string): Observable<Game[]> {
    const encodedQuery = encodeURIComponent(query.trim());
    return this.http.get<Game[]>(`${this.apiUrl}?q=${encodedQuery}`);
  }

  getGamesByMinPrice(price: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}?price_gte=${price}`);
  }

  getGamesByMaxPrice(price: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}?price_lte=${price}`);
  }

  getGamesByPriceRange(minPrice: number, maxPrice: number): Observable<Game[]> {
    return this.http.get<Game[]>(
      `${this.apiUrl}?price_gte=${minPrice}&price_lte=${maxPrice}`,
    );
  }

  /* getGamesPage(page: number, limit: number): Observable<HttpResponse<Game[]>> {
    const url = `${this.apiUrl}?_page${page}&_limit${limit}`;
    return this.http.get<Game[]>(url, {
      observe: 'response',
    });
  } */

  getGamesPage(
    page: number,
    limit: number,
    genre: string,
    platform: string,
    q: string,
    title: string,
    minPrice: number | null,
    maxPrice: number | null,
  ) {
    let params = new HttpParams().set('_page', page).set('_limit', limit);

    if (genre && genre !== 'Todos') {
      params = params.set('genre', genre);
    }
    if (platform && platform !== 'Todas') {
      params = params.set('platform', platform);
    }
    if (q) {
      params = params.set('q', q);
    }
    if (title) {
      params = params.set('title_like', title);
    }
    if (minPrice !== null && minPrice !== undefined) {
      params = params.set('price_gte', minPrice);
    }
    if (maxPrice !== undefined && maxPrice !== null) {
      params = params.set('price_lte', maxPrice);
    }

    return this.http.get<Game[]>(this.apiUrl, {
      params,
      observe: 'response',
    });
  }
}
