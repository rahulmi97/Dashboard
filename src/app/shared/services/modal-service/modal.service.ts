import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent } from 'src/app/core/dashboard/dashboard.component';
import { ConfirmationModalComponent } from './../../components/modal/confirmation-modal/confirmation-modal.component';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalRef: MatDialogRef<any>;
  constructor(private dialog: MatDialog) {}

  openDialog(data) {
    this.modalRef = this.dialog.open(DashboardComponent, {
      data: data,
    });
  }
  closeModal() {
    this.modalRef.close();
  }
  openConfirmationModal(executeFnAfterConfirmation) {
    this.modalRef = this.dialog.open(ConfirmationModalComponent, {
      data: executeFnAfterConfirmation,
    });
  }
}
