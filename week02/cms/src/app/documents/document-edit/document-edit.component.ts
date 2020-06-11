import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DocumentsService } from '../documents.service';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})

export class DocumentEditComponent implements OnInit {
  @ViewChild('f', { static: false }) documentForm: NgForm;
  
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private documentService: DocumentsService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.originalDocument = this.documentService.getDocument(params['id']);
    });
  }

  onSubmit() {
    let checkEditMode = this.documentService.getDocument(this.documentForm.value.id);
    console.log(checkEditMode);
    let newDocument = new Document(
      this.documentService.getMaxId.toString(),
      this.documentForm.value.name,
      this.documentForm.value.description,
      this.documentForm.value.url
    )
    if(checkEditMode === null){
      this.documentService.addDocument(newDocument);
    } else {
      this.documentService.updateDocument(checkEditMode, newDocument);
    }
    this.onCancel();
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
