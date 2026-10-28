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

  ngOnInit(): void {
    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });
  }

  searchGameById(id: string): void {
    const idNumber = Number(id);
    this.gameService.getGameById(idNumber).subscribe((game) => {
      this.game = game;
    });
  }

  onGenreChange(genre: string): void {
    console.log(genre);
  }

  onPlatformChange(platform: string): void {
    console.log(platform);
  }

  searchGamesByTitle(title: string): void {
    this.gameService.getGamesByTitle(title).subscribe((games) => {
      this.games = games;
    });
  }
}
