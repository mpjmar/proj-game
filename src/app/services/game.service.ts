import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/games';

  getGames() {
    return this.http.get<Game[]>(this.apiUrl);
  }

  getGameById(id: number) {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  getGamesByGenre(genre: string) {
    return this.http.get<Game[]>(`${this.apiUrl}?genre=${genre}`);
  }

  getGamesByPlatform(platform: string) {
    return this.http.get<Game[]>(`?platform=${platform}`);
  }

  getGamesByTitle(title: string) {
    return;
  }
}
