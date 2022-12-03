import { Component, OnInit, Input, Output } from '@angular/core';
import { CacheService } from '../../services/cache.service';
import { SnackbarService } from '../../services/snackbar.service';
import { EventEmitter } from 'events';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  @Input()  time: number | string;
  @Output() timeChange = new EventEmitter<number>();
  @Input()  cards: number | string;
  @Output() cardsChange = new EventEmitter<number>();

  constructor(public cache: CacheService, private _snackBar: SnackbarService) { }

  ngOnInit(): void {

    // @ts-ignore
    this.cache.getItem("time").subscribe(
      item => {
        // @ts-ignore
        this.time = item || 0;
      },
    () => this.time = 0
    );

    this.cache.getItem("cards").subscribe(
      item => {
        // @ts-ignore
        this.cards = item || 20;
      },
      () => this.cards = 20
    );
  }

  setCards() {
    this.cache.setItem("cards", this.cards).subscribe(
      () => this.openSnackBar("Cartas Actualizadas", "OK"),
      error => console.error(error),
    );
  }

  setTime() {
    this.cache.setItem("time", this.time).subscribe(
      () => this.openSnackBar("Tiempo Actualizado", "OK"),
      error => console.error(error),
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.openSnackBar(message, action);
  }
}
