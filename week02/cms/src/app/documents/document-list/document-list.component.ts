import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model'
import { DocumentsService } from '../documents.service';
import { MOCKDOCUMENTS } from '../MOCKDOCUMENTS';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  
  private subscription: Subscription;

  constructor(private documentService: DocumentsService) {
    this.documents = MOCKDOCUMENTS;
  }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}