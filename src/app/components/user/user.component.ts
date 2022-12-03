import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name: string;
  isLogged: boolean;

  constructor(private _cache: CacheService) { }

  ngOnInit(): void {
    this._cache.getItem("jwt").subscribe(
      data => this.isLogged = !!data,
    );
    this._cache.getItem("username").subscribe(
      data => this.name = `${data}`,
    );
  }

}
