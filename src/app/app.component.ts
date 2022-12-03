import {Component, OnInit} from '@angular/core';
import {SessionService} from "./services/session.service";
import {CacheService} from "./services/cache.service";
import {RecordService} from "./services/record.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cards';
  username = '';
  jwt = '';

  constructor(
    private _cache: CacheService,
    private recordService: RecordService,
  ) {}

  ngOnInit(): void {
    this._cache.getItem("username").subscribe(
      username => {
        this.username = `${username}`;
        this._cache.getItem("jwt").subscribe(
          jwt => {
            this.jwt = `${jwt}`;
            this.recordService.getRecordsByUser(this.username, this.jwt)
              .subscribe(
                () => {},
                err => {
                  if(err.status==401) {
                    this._cache.removeItem("jwt").subscribe(
                      () => {},
                      () => {},
                    );
                  }
                },
              );
          })
      },
    );
  }


}
