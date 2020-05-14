import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model'
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, 'CIT260', 'Learning Object Oriented Programming using JavaScript', 'https://www.byui.edu/catalog#/courses/'),
    new Document(2, 'CIT365', 'Learning C# .NET using Visual Studio', 'https://www.byui.edu/catalog#/courses/'),
    new Document(3, 'WDD430', 'Learning Full-Stack Development Using Angular', 'https://www.byui.edu/catalog#/courses/'),
    new Document(4, 'CSE120B', 'Learning Python', 'https://www.byui.edu/catalog#/courses/'),
    new Document(5, 'CSE212', 'Learning Programming Data Sctructures', 'https://www.byui.edu/catalog#/courses/')

  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }
}
