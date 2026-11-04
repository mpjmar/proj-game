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

  selectedGenre = '';
  selectedPlatform = '';
  gameTitle = '';
  q = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;

  private gameService = inject(GameService);
  // constructor(private gameService: GameService) {}

  // HOOK: OnInit para hidratación del template ya cargado en esqueleto HTML
  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(): void {
    this.gameService
      .getGamesPage(
        this.currentPage,
        this.pageSize,
        this.selectedGenre,
        this.selectedPlatform,
        this.q,
        this.gameTitle,
        this.minPrice,
        this.maxPrice,
      )
      .subscribe((response) => {
        this.games = response.body ?? [];
        this.totalItems = Number(response.headers.get('X-Total-Count') ?? 0);
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      });
  }

  searchGames(query: string): void {
    const search = query.trim();
    if (search === '') {
      this.gameService.getAllGames().subscribe((games) => {
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
      this.gameService.getAllGames().subscribe((games) => {
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
    this.loadPage();
  }

  onPlatformChange(platform: string): void {
    this.selectedPlatform = platform;
    this.currentPage = 1;
    this.loadPage();
  }

  applyFilters(): void {
    this.gameService
      .getGamesByFilters(this.selectedGenre, this.selectedPlatform)
      .subscribe((games) => {
        this.games = games;
      });
  }

  onSearchGamesByTitle(title: string): void {
    const search = title.trim();
    if (search === '') {
      this.gameService.getAllGames().subscribe((games) => {
        this.games = games;
      });
    } else {
      this.gameService.getGamesByTitle(search).subscribe((games) => {
        this.games = games;
      });
    }
  }

  onSearchByPrice(minPrice: string, maxPrice: string): void {
    const min = Number(minPrice);
    const max = Number(maxPrice);
    this.gameService.getGamesByPriceRange(min, max).subscribe((games) => {
      this.games = games;
    });
  }

  onPageSizeChange(limit: string): void {
    this.pageSize = +limit;
    this.currentPage = 1;
    this.loadPage();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPage();
    }
  }
}
