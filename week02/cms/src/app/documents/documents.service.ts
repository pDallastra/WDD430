import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model'
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

   getDocuments(): Document[] {
     return this.documents.slice();
   }

   getDocument(id: string): Document {
     this.documents.forEach(element => {
       if(element.id == id){
          return element;
       }
     });
     return null;
   }
}
