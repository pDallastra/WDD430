import { Contact } from './contact.model'
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Injectable, EventEmitter } from '@angular/core'; 
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts: Contact[];

  contactChangedEvent = new EventEmitter<Contact[]>();

  contactListChangedEvent = new Subject<Contact[]>();

  maxContactId: number;

  constructor(private http: HttpClient) {
    this.getContacts();

    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http.get('https://angular-w10.firebaseio.com/contacts.json')
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a,b) => 
          (a.id < b.id) ? 1 : (a.id > b.id) ? -1 : 0
        )
        this.contactListChangedEvent.next(this.contacts.slice());
      }),
      (error: any) => {
        console.log(error);
      }
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null || newContact === undefined) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();

    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if(originalContact === null ||  originalContact === undefined || newContact === null || newContact === undefined){
      return;
    }
  
    const pos = this.contacts.indexOf(originalContact);
    if(pos < 0){
      return;
    }

    newContact.id = originalContact.id;

    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (contact === null || contact === undefined) {
      return;
    }
    const pos = this.contacts.indexOf(contact);

    if (pos < 0) {
      return;
    }
    
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  storeContacts() {
    let contacts = JSON.stringify(this.contacts);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    //put method with url, contacts object to replace, and headers
    this.http.put('https://cms-app-d5fce.firebaseio.com/contacts.json', contacts, { headers: headers })
      
      .subscribe(
        () => {
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      )
  }
}
