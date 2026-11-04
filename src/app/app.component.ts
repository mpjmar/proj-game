import { Component, inject, OnInit } from '@angular/core';
import { Game } from './models/game';
import { GameService } from './services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'proj-game';
  games?: Game[];
  game?: Game;
  selectedGenre = 'Todos';
  selectedPlatform = 'Todas';
  currentPage = 0;

  private gameService = inject(GameService);
  // constructor(private gameService: GameService) {}

  // HOOK: OnInit para hidratación del template ya cargado en esqueleto HTML
  ngOnInit(): void {
    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });
  }

  searchGames(query: string): void {
    const search = query.trim();

    if (search === '') {
      this.gameService.getGames().subscribe((games) => {
        this.games = games;
      });
    } else {
      this.gameService.getGamesByQuery(search).subscribe((games) => {
        this.games = games;
      });
    }
  }

  searchGameById(id: string): void {
    if (id === '') {
      this.gameService.getGames().subscribe((games) => {
        this.games = games;
      });
    } else {
      const idNumber = Number(id);
      this.gameService.getGameById(idNumber).subscribe((game) => {
        this.games = [game];
      });
    }
  }

  onGenreChange(genre: string): void {
    this.selectedGenre = genre;
    this.currentPage = 1;
    this.applyFilters();
  }

  onPlatformChange(platform: string): void {
    this.selectedPlatform = platform;
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    this.gameService
      .getGamesByFilters(this.selectedGenre, this.selectedPlatform)
      .subscribe((games) => {
        this.games = games;
      });
  }

  searchGamesByTitle(title: string): void {
    const search = title.trim();
    if (search === '') {
      this.gameService.getGames().subscribe((games) => {
        this.games = games;
      });
    } else {
      this.gameService.getGamesByTitle(search).subscribe((games) => {
        this.games = games;
      });
    }
  }
}
