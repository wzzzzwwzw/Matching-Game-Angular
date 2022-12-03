import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
  @Input() timeStr: string;

  constructor() { }

  ngOnInit(): void {
  }

}
