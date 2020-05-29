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
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [];

  constructor(private documentService: DocumentsService) {

  }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )
  }
}