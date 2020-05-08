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
    new Document(1, 'CIT260', 'Learning Object Oriented Programming using JavaScript', 'https://www.byui.edu/catalog#/courses/NJsaox3sW?bc=true&bcCurrent=Object%20Oriented%20Programming&bcItemType=Courses'),
    new Document(2, 'CIT365', 'Learning C# .NET using Visual Studio', 'https://www.byui.edu/catalog#/courses/V1V6rBcAb?bc=true&bcCurrent=.NET%20Software%20Development&bcItemType=Courses'),
    new Document(3, 'WDD430', 'Learning Full-Stack Development Using Angular', 'https://www.byui.edu/catalog#/courses/VJkxTr9Ab?bc=true&bcCurrent=Web%20Full-Stack%20Development&bcItemType=Courses'),
    new Document(4, 'CSE120B', 'Learning Python', 'https://www.byui.edu/catalog#/courses/H1slReR2X?bc=true&bcCurrent=Python%20Language&bcItemType=Courses'),
    new Document(5, 'CSE212', 'Learning Programming Data Sctructures', 'https://www.byui.edu/catalog#/courses/BJIrEvD2m?bc=true&bcCurrent=Programming%20with%20Data%20Structures&bcItemType=Courses')

  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }
}
