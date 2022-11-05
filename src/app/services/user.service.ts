import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/api/user/';

  constructor(private http: HttpClient) { }

  
  addUser(user: UserModel): Observable<any> {
    return this.http.post(this.url, user);
  }
  autenthication(user: UserModel): Observable<any> {
    return this.http.post(this.url+'login', user);
  }
  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
  updateUser(user: UserModel): Observable<any> {
    return this.http.put(this.url + user._id, user);
  }

  // Estructura otros servicios

  // getUserById(id: string): Observable<any> {
  //   return this.http.get(this.url + id);
  // }
}
