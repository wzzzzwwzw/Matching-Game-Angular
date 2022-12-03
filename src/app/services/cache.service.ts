import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(protected localStorage: LocalStorage) { }

  setItem(key: string, value: any) {
    return this.localStorage.setItem(key, value);
  }

  getItem(key: string) {
    return this.localStorage.getItem(key);
  }

  removeItem(key: string) {
    return this.localStorage.removeItem(key);
  }

  clear() {
    return this.localStorage.clear();
  }
}
