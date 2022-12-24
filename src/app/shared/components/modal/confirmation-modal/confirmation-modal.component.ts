import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from './../../../services/modal-service/modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.sass'],
})
export class ConfirmationModalComponent implements OnInit {
  executeFnAfterConfirmation: () => {};
  constructor(
    @Inject(MAT_DIALOG_DATA) modalData,
    public modalService: ModalService
  ) {
    this.executeFnAfterConfirmation = modalData;
  }

  ngOnInit(): void {}
}
