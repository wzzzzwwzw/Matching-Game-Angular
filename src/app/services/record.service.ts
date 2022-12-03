import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  url: string = 'http://fenw.etsisi.upm.es:10000';

  constructor(private http: HttpClient) {}

  getRecords() {
    return this.http.get<Record[]>(`${this.url}/records`);
  }

  getRecordsByUser(username: string, jwt: string) {
    return this.http.get<Record[]>(
      `${this.url}/records/${username}`,
      { headers: {
          'Authorization': jwt
        } });
  }

  createRecord(record: any, jwt: string) {
    return this.http.post<Record>(
      `${this.url}/records`,
      record,
      { headers: {
          'Authorization': jwt
        } });
  }

  deleteRecords(jwt: string) {
    return this.http.delete<Record>(
      `${this.url}/records`,
      { headers: {
          'Authorization': jwt
        } });
  }

}
