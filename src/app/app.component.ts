import { Component } from '@angular/core';
import { IFormData } from './shared/interface/IFormData';
import { ModalService } from './shared/services/modal-service/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'Dashboard';
  tableData: IFormData[] = [];
  constructor(private modalService: ModalService) {}
  addData() {
    this.modalService.openDialog({
      edit: false,
      callBackFn: (formData) => {
        this.tableData.push(formData);
        this.tableData = [...this.tableData];
        this.modalService.closeModal();
      },
      tableData: this.tableData,
    });
  }
  updatedListData(tableData: IFormData[]){
    this.tableData=tableData;
  }
}
