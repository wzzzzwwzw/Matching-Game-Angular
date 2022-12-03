import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()  name: string;
  @Input()  id: string;

  constructor() { }

  ngOnInit(): void {}

}
