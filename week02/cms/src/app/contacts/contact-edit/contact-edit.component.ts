import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { NgForm } from '@angular/forms';

import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})

export class ContactEditComponent implements OnInit {
  @ViewChild('f', { static: false }) contactForm: NgForm;
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactsService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.contact = this.contactService.getContact(params['id']);
    })
  }

  onSubmit() {
    let newContact = new Contact(
      this.contactService.getMaxId.toString(),
      this.contactForm.value.name,
      this.contactForm.value.email,
      this.contactForm.value.phone,
      this.contactForm.value.imageUrl,
      this.groupContacts
    )
    this.contactService.addContact(newContact);
    this.onCancel();
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onRemoveItem(index: number) {
    if (index < 0 || index > this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
    this.invalidGroupContact = false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }
}