import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { MOCKCONTACTS } from '../MOCKCONTACTS';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  term: String = '';
  contacts: Contact[] = [];

  private subscription: Subscription;

  constructor(private contactService: ContactsService) { 
   }

  ngOnInit(): void {
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
    this.contactService.getContacts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: String) {
    this.term = value;
  }
}
