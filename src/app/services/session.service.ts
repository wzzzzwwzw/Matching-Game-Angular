import { Injectable } from '@angular/core';
import { Record } from '../models/record';
import { HttpClient } from '@angular/common/http';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  url: string = 'http://fenw.etsisi.upm.es:10000';

  constructor(
    private cache: CacheService,
    private http: HttpClient,
  ) {}

  check(username: String) {
    return this.http.get<Record[]>(`${this.url}/records/`);
  }
}
