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

  private gameService = inject(GameService);
  // constructor(private gameService: GameService) {}

  // HOOK: OnInit para hidratación del template ya cargado en esqueleto HTML
  ngOnInit(): void {
    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });
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
    if (genre === 'Todos') {
      this.gameService.getGames().subscribe((games) => {
        this.games = games;
      });
    } else {
      this.gameService.getGamesByGenre(genre).subscribe((games) => {
        this.games = games;
      });
    }
  }

  onPlatformChange(platform: string): void {
    if (platform === 'Todas') {
      this.gameService.getGames().subscribe((games) => {
        this.games = games;
      });
    } else {
      this.gameService.getGamesByPlatform(platform).subscribe((games) => {
        this.games = games;
      });
    }
  }

  searchGamesByTitle(title: string): void {
    if (title === '') {
      this.gameService.getGames().subscribe((games) => {
        this.games = games;
      });
    } else {
      this.gameService.getGamesByTitle(title).subscribe((games) => {
        this.games = games;
      });
    }
  }
}
