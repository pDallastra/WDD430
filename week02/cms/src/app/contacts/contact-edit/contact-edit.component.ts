import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  onCancel(){

  }

  onRemoveItem(i){

  }
}