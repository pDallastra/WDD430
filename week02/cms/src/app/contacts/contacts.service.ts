import {Contact} from './contact.model'
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Injectable, EventEmitter } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    this.contacts.forEach(element => {
      if(element.id == id){
        return element;
      }
    });
    return null;
  }

}
