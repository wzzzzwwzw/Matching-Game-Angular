import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://fenw.etsisi.upm.es:10000';

  constructor(private http: HttpClient) {}

  getByUsername(username: string) {
    return this.http.get<User>(`${this.url}/users/${username}`);
  }

  createUser(user: User) {
    return this.http.post<User>(`${this.url}/users`, user);
  }

  loginUser(username: string, password: string) {
    return this.http.get(`${this.url}/users/login?username=${username}&password=${password}`);
  }
}
