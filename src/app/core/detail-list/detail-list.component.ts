import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { IFormData } from 'src/app/shared/interface/IFormData';
import { ModalService } from './../../shared/services/modal-service/modal.service';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.sass'],
})
export class DetailListComponent implements OnInit, OnChanges {
  @Input() listData;
  @Output() updatedListData= new EventEmitter<any>()
  columnDefs: ColDef[] = [
    { field: 'projectName' },
    { field: 'completion' },
    { field: 'managerName' },
    {
      field: 'Action',
      cellRenderer: (rowData) => {
        const buttons = [];
        buttons.push({
          buttonName: 'Edit',
          showLoader: true,
          function: () => {
            const editData = {
              edit: true,
              callBackFn: (data) => {
                const index = this.listData.findIndex(
                  (ele) => ele.projectName === rowData.data.projectName
                );
                if (index !== -1) {
                  this.listData.splice(index, 1, data);
                }
                this.listData = [...this.listData];
                this.gridApi.redrawRows();
                this.cdRef.detectChanges();
                this.modalService.closeModal();
              },
              formData: rowData.data,
              tableData: this.listData,
            };
            this.modalService.openDialog(editData);
          },
        });
        buttons.push({
          buttonName: 'Delete',
          showLoader: true,
          function: () => {
            this.modalService.openConfirmationModal(() => {
              const index = this.listData.findIndex(
                (ele) => ele.projectName === rowData.data.projectName
              );
              if (index !== -1) {
                this.listData.splice(index, 1);
              }
              this.listData = [...this.listData];
              this.updatedListData.emit(this.listData)
              this.modalService.closeModal();
            });
          },
        });
        return this.generateTableButtons(buttons);
      },
    },
  ];
  tableData: IFormData[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    flex: 1,
    resizable: true,
  };
  gridApi: GridApi;
  constructor(
    private modalService: ModalService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
  ngOnChanges(change) {}
  generateTableButtons(buttons) {
    const divElement = document.createElement('div');
    divElement.style.display = 'flex';
    buttons.forEach((button) => {
      const btnElement = document.createElement('div');
      if (button.buttonClass) {
        btnElement.classList.add(...button.buttonClass.split(' '));
      }
      btnElement.innerHTML = button.buttonName;
      if (button.buttonName === 'Edit') {
        btnElement.style.color = 'blue';
      } else {
        btnElement.style.color = 'red';
      }
      btnElement.style.padding = '4px';
      btnElement.style.margin = '0 3px';
      btnElement.style.fontSize = '0.75rem';
      btnElement.style.cursor = 'pointer';
      btnElement.addEventListener('click', (event) => {
        event.stopPropagation();
        button.function(button);
      });
      divElement.appendChild(btnElement);
    });
    return divElement;
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
}
