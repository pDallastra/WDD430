import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model'
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(2, 'WDD430', 'Start working on Week04 Project', 'Paulo Dallastra'),
    new Message(3, 'FAML160', 'Keep reading Chap05 for next week', 'Paulo Dallastra'),
    new Message(4, 'ECEN106', 'Take the Test01 For the Class', 'Paulo Dallastra')

  ];
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
