import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {
  @Input() show: boolean;

  constructor() {}


  ngOnInit(): void {}

  save() {
    alert(this.show);
  }

}
