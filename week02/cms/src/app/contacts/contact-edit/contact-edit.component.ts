import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  originalContact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact: boolean;

  constructor(private contactService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if(params.id == undefined || params.id == null){
          this.editMode = false;
          return
        }

        this.originalContact = this.contactService.getContact(params.id);
        if(this.originalContact == undefined || this.originalContact == null){
          return
        }

        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if(this.hasGroup == true){
          
        }
      }
    )
  }

  onCancel(){
    this.router.navigateByUrl('/contacts');
  }

  onRemoveItem(idx: number){
    if(idx < 0 || idx >= this.groupContacts.length){
      return
    }

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;

  }

  isInvalidContact(newContact: Contact){
    if(!newContact){
      return true;
    }

    if(newContact.id === this.contact.id){
      return true;
    }

    for(let i = 0; i< this.groupContacts.length; i++){
      if(newContact.id === this.groupContacts[i].id){
        return true;
      }
    }

    return false;
  }

  addToGroup(event: any){
    let selectedContact: Contact = event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if(this.invalidGroupContact){
      return;
    }

    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onSubmit(form: NgForm){
    let name = form.value.name;
    let email = form.value.email;
    let phone = form.value.phone;
    let imageUrl = form.value.imageUrl;

    let newContact = new Contact('12', name, email, phone, imageUrl, this.groupContacts);

    if(this.editMode == true){
      this.contactService.updateContact(this.originalContact, newContact)
    } else{
      this.contactService.addContact(newContact);
    }

    this.router.navigateByUrl('/contacts');
  }
}