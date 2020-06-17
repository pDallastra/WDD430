import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model'
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[];
  maxDocumentId: number;
  documentChangedEvent = new EventEmitter<Document[]>();
  maxDocumentID: number;
  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;

    this.maxDocumentId = this.getMaxId();
  }

  getHttp() {
    this.http.get('https://angular-w10.firebaseio.com/');
  }

  getDocuments(){
    this.http.get('https://angular-w10.firebaseio.com/documents.json')
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentID = this.getMaxId();
        this.documents.sort((a,b) => 
          (a.id < b.id) ? 1 : (a.id > b.id) ? -1 : 0
        )
        this.documentChangedEvent.next(this.documents.slice());
      }),
      (error: any) => {
        console.log(error);
      }
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();

    this.documents.push(newDocument);
    const documentListClone = this.documents.slice();
    this.documentChangedEvent.next(documentListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || originalDocument === undefined || newDocument === null || newDocument === undefined) {

      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentListClone = this.documents.slice();
    this.documentChangedEvent.next(documentListClone);
  }

  deleteDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }
    const pos = this.documents.indexOf(document);

    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }

  storeMessages() {
    let documents = JSON.stringify(this.documents);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://angular-w10.firebaseio.com/documents.json', documents, { headers: headers })

      .subscribe(
        () => {
          this.documentChangedEvent.next(this.documents.slice());
        }
      )
  }
}
