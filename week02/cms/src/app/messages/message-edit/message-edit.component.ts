import { Component, OnInit, Input, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @Input() message: Message;

  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender = 'Paulo Dallastra';

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    let subject = this.subject;
    let msgText = this.msgText;
    let content = new Message(1, subject, msgText, this.currentSender);

    this.addMessageEvent.emit(content);
  }

  onClear(){
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
