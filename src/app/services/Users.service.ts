import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserList } from '../models/UserList';
const headers = {
  headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }),
};
const path =  environment.basePath;
const persistent = environment.persistent;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  list(): Observable<any> {
    if(persistent) return this.listApi();
    else return this.listLocal();
  }

  listApi(): Observable<any> {
   return this.httpClient.get<UserList[]>(path + 'list',headers);
  }
  listLocal(): Observable<any> {
    let users: UserList[];
    users =  JSON.parse(sessionStorage.getItem('users') || "[]");
    return of(users);
   }
}
