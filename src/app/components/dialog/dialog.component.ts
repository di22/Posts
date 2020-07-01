import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IPosts} from '../../models/IPosts';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  postForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IPosts,
              private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.initForm();
    this.postForm.setValue(this.data);
  }

  initForm = () => {
    this.postForm = this.formBuilder.group({
      id: [],
      title: [],
      body: [],
      userId: []
    });
  }
  onNoClick(actionType, formValue?): void {
    this.dialogRef.close({actionType, formValue});
  }

}
