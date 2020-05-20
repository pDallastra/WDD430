import { Injectable } from '@angular/core';
import {Message } from './message.model'
import { MOCKMESSAGES } from './MOCKMESSAGES';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];
  constructor() {
    this.messages = MOCKMESSAGES;
   }

   getMessages(): Message[] {
     return this.messages.slice();
   }

   getMessage(id: string): Message {
     this.messages.forEach(element => {
       if(element.id == id){
         return element;
       }
     });
     return null;
   }
}
