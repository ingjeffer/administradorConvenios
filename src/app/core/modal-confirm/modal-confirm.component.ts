import { Component, OnInit } from '@angular/core';
import { IModalData, ModalConfirmService } from '.';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.sass']
})
export class ModalConfirmComponent implements OnInit {

  constructor(private _modalService: ModalConfirmService) { }

  ngOnInit(): void {}

  confirm(data: boolean) {
    this._modalService.confirm = data;
    this._modalService.open(false);
  }

  get data(): IModalData | undefined {
    return this._modalService.data;
  }

}
