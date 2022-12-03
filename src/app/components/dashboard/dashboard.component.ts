import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() points: number;
  @Input() total: number;

  constructor() { }

  ngOnInit(): void {
  }

}
