import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/games';

  getGames(): Observable<Game[]> {
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
    if (platform !== 'Todos') params.push(`platform=${platform}`);

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    return this.http.get<Game[]>(url);
  }

  getGamesByTitle(title: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}?title_like=${title}`);
  }

  getGamesByQuery(query: String): Observable<Game[]> {
    const encodedQuery = encodeURIComponent(query.trim());

    return this.http.get<Game[]>(`${this.apiUrl}?q=${encodedQuery}`);
  }
}
