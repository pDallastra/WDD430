import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model'
import { DocumentsService } from '../documents.service';
import { MOCKDOCUMENTS } from '../MOCKDOCUMENTS';
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentsService) {
    this.documents = MOCKDOCUMENTS
   }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document){
    this.documentService.documentSelectedEvent.emit(document);
  }
}
