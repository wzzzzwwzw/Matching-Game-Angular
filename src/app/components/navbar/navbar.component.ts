import { Component, OnInit } from '@angular/core';
import {CacheService} from "../../services/cache.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean;

  constructor(private _cache: CacheService) { }

  ngOnInit(): void {
    this._cache.getItem("jwt").subscribe(
      data => this.isLogged = !!data,
    )
  }

  logout() {
    this._cache.removeItem("jwt").subscribe(
      () => this.isLogged = false,
    )
  }
}
