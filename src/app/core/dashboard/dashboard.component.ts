import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormData } from 'src/app/shared/interface/IFormData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  formGroup = new FormGroup({
    projectName: new FormControl('', [
      Validators.required,
      this.checkIfNameExist.bind(this),
    ]),
    completion: new FormControl('', [Validators.required, Validators.max(100)]),
    managerName: new FormControl('', [Validators.required]),
  });
  showLoader: boolean = false;
  showErrorMsg: boolean = false;
  tableData: IFormData[] = [];
  addData: (data) => {};
  isEdit: boolean = false;
  modalData: any;
  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.modalData = data;
    this.addData = data.callBackFn;
    this.isEdit = data.edit;
    this.tableData = data.tableData;
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.formGroup.reset(this.modalData['formData']);
    }
  }
  getSiteDeatails() {
    this.formGroup.markAllAsTouched();
    if(this.formGroup.invalid){
      this.formGroup.updateValueAndValidity();
      return
    }
    this.addData(this.formGroup.value);
  }
  checkIfNameExist(control: FormControl): { [key: string]: boolean } {
    if (!this.tableData || this.isEdit) {
      return null;
    }
    const nameList = this.tableData.map((ele) => ele.projectName);
    if (nameList.includes(control.value)) {
      return { nameExist: true };
    } else {
      return null;
    }
  }
  getProjectNameValidator(): string {
    if (!this.formGroup) {
      return;
    }
    const error = this.formGroup.get('projectName').errors;
    let errorMsg: string = '';
    Object.keys(error).forEach((err) => {
      if (err === 'required' && error[err]) {
        errorMsg = 'Project name is required.';
      } else if (err === 'nameExist' && error[err]) {
        errorMsg = 'Project name already exist.';
      }
    });
    return errorMsg;
  }
  getPercentageError() {
    if (!this.formGroup) {
      return;
    }
    const error = this.formGroup.get('completion').errors;
    let errorMsg: string = '';
    Object.keys(error).forEach((err) => {
      if (err === 'required' && error[err]) {
        errorMsg = 'Percentage is required.';
      } else if (err === 'max' && error[err]) {
        errorMsg = 'It should be less than 100.';
      }
    });
    return errorMsg;
  }
}
