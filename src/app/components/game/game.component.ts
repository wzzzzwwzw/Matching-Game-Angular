import { Component, HostListener, OnInit } from '@angular/core';
import { CacheService } from '../../services/cache.service';
import { Card } from '../../models/card';
import { Router } from '@angular/router';
import { RecordService } from '../../services/record.service';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playing = false;
  // tslint:disable-next-line:variable-name
  number_of_cards: number;
  // tslint:disable-next-line:variable-name
  limit_time: number;
  matches: number;
  points = 0;
  // tslint:disable-next-line:variable-name
  stop_watch = null;
  cards: Card[] = [];
  // tslint:disable-next-line:variable-name
  possible_values: string[] = [
    'assets/images/AS.jpg',
    'assets/images/AH.jpg',
    'assets/images/AD.jpg',
    'assets/images/AC.jpg',
  ];
  first_selected_card: Card;
  second_selected_card: Card;
  time = 0;
  timeStr: string;
  total = 0;
  show = false;
  jwt = '';

  constructor(
    private cache: CacheService,
    private recordService: RecordService,
    private router: Router,
    private _snack: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.cache.getItem('cards').subscribe(
      item => {
        // @ts-ignore
        this.number_of_cards = item || 20;
        this.matches = this.number_of_cards / 2;
        this.playing = true;
        if (this.stop_watch) { clearInterval(this.stop_watch); }
        this.initSW();
        this.drawDashboard();
      },
      () => this.number_of_cards = 20
    );
    this.cache.getItem('time').subscribe(
      item => this.limit_time = Number(item),
      () => {},
    );
    this.cache.getItem('jwt').subscribe(
      item => this.jwt = item ? `${item}` : '',
      () => {},
    );
  }

  drawDashboard() {
    for (let i = 0; i < this.matches; i = i + 1) {
      const card = new Card(
        this.possible_values[
          Math.floor(Math.random() * (this.possible_values.length - 1 + 1))
          ],
        false,
      );
      this.cards.push(card);
    }

    const cloned = [];
    for (let i = 0; i < this.cards.length; i++) {
      cloned.push(
        new Card(
          this.cards[i].image,
          false,
        )
      );
    }
    this.cards = [...this.cards, ...cloned];
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  @HostListener('document:click', ['$event'])
  click(event) {
    const target = event.target;

    if ( target.nodeName.localeCompare('IMG') === 0 && this.playing) {
     this.assign(target.id);
   }
  }

  assign(id: number) {
    if (this.first_selected_card && this.second_selected_card) { return; }

    id = Number(id);

    if (this.cards[id].status === false) {
      this.cards[id].status = true;

      if (!this.first_selected_card) {
        this.first_selected_card = this.cards[id];
      } else if (!this.second_selected_card) {
        this.second_selected_card = this.cards[id];
      }
      this.play();
    }
  }

  play() {
    if (this.first_selected_card && this.second_selected_card) {

      if (this.first_selected_card.compare(this.second_selected_card)) {

        this.matches = this.matches - 1;
        this.points = this.points + 15;
        this.first_selected_card = null;
        this.second_selected_card = null;
      } else {

        setTimeout(() => {
          this.first_selected_card.status = false;
          this.second_selected_card.status = false;
          this.first_selected_card = null;
          this.second_selected_card = null;
          this.points = this.points - 5;
        }, 700);
      }

    }
    this.check();
  }

  check() {
    if (this.matches <= 0) {
      this.playing = false;
      this.calculate();
    }
  }

  calculate() {
    this.total = this.points;

    if ( this.number_of_cards === 26 ) {
      this.total = this.total + 25;
    } else if ( this.number_of_cards === 32 ) {
      this.total = this.total + 50;
    }

    switch (this.limit_time) {
      case 60:
        this.total = this.total + 100;
        break;
      case 90:
        this.total = this.total + 75;
        break;
      case 120:
        this.total = this.total + 50;
        break;
      case 150:
        this.total = this.total + 25;
        break;
    }
    this.show = (this.jwt.length > 0 && this.points > 0);
  }

  private initSW() {
    this.stop_watch = setInterval(() => {
      this.time = this.time + 1;
      if ((this.time > this.limit_time || !this.playing) && this.limit_time != 0) {
        this.playing = false;
        clearInterval(this.stop_watch);
      } else {
        this.timeStr = this.secondsToMinutes(this.time);
      }
    }, 1000);
  }

  // tslint:disable-next-line:typedef
  secondsToMinutes(seconds) {
    return `${Math.trunc(seconds / 60)}:${seconds % 60}`;
  }

  // tslint:disable-next-line:typedef
  save() {
    const record = {
      punctuation: this.total,
      cards: this.number_of_cards,
      disposedTime: this.time,
    };
    this.recordService.createRecord(record, this.jwt).subscribe(
      () => {
        this.router.navigateByUrl('/records');
      },
      () => {
        this._snack.openSnackBar('Tu sesión ha caducado', 'OK');
      },
    );
  }
}
