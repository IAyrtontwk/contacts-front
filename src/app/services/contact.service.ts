import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactModel } from '../models/contact.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = 'http://localhost:3000/api/contact/';

  constructor(private http: HttpClient) { }

  
  addContact(contact: ContactModel): Observable<any> {
    return this.http.post(this.url, contact);
  }
  getContacts(): Observable<any> {
    return this.http.get(this.url);
  }
  getContactById(id: string): Observable<any> {
    return this.http.get(`${this.url}${id}`);
  }
  deleteContact(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
  updateContact(contact: ContactModel): Observable<any> {
    return this.http.put(this.url + contact._id, contact);
  }
}
