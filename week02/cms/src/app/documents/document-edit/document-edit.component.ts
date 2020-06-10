import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if(params.id === undefined|| params.id == null){
          this.editMode = false;
          return
        }
        this.originalDocument = this.documentService.getDocument(params.id);

        if(this.originalDocument === undefined || this.originalDocument == null){
          return
        }

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
  }

  onCancel() {
    this.router.navigateByUrl('/documents');
  }

  onSubmit(form: NgForm) {
    let name = form.value.name;
    let description = form.value.description;
    let documentUrl = form.value.documentUrl;

    let newDocument = new Document('12', name, description, documentUrl);

    if(this.editMode == true){
      this.documentService.updateDocument(this.originalDocument, newDocument)
    } else{
      this.documentService.addDocument(newDocument);
    }

    this.router.navigateByUrl('/documents');
  }
}
