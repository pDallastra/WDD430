import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model'
import { MOCKMESSAGES } from './MOCKMESSAGES';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];
  messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
      this.getMessages();
   }

   getMessages() {
      this.http.get('https://angular-w10.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a,b) => 
            (a.id < b.id) ? 1 : (a.id > b.id) ? -1 : 0
          )
          this.messageChangeEvent.next(this.messages.slice());
        }),
        (error: any) => {
          console.log(error);
        }
   }

   getMessage(id: string): Message {
     for (const message of this.messages){
       if(message.id === id){
         return message;
       }
     }
     return null;
   }

   getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

   addMessage(message: Message){
     this.messages.push(message)
     this.messageChangeEvent.emit(this.messages.slice());
   }

   storeMessages() {
    let messages = JSON.stringify(this.messages);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://angular-w10.firebaseio.com/messages.json', messages, { headers: headers })

      .subscribe(
        () => {
          this.messageChangeEvent.next(this.messages.slice());
        }
      )
  }
}
