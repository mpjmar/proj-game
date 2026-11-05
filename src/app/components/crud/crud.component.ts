import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-crud',
  imports: [FormsModule, JsonPipe],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
})
export class CrudComponent {
  private gameService = inject(GameService);

  game: Game = {
    title: '',
    genre: '',
    platform: '',
    price: 0,
    stock: 0,
  };

  onSaveGame() {
    console.log(this.game);
  }
}
