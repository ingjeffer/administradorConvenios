import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { IModalConfirm, IModalData } from '../entities';
import { ModalConfirmComponent } from '../modal-confirm.component';

@Injectable()
export class ModalConfirmService {

  private _confirm = new Subject<boolean>();
  private _data: IModalData | undefined;
  private _dialogRef: MatDialogRef<ModalConfirmComponent>;

  constructor(private _dialog: MatDialog, 
    ) { }

  private _openAction(data: IModalConfirm | undefined) {
    this._dialogRef = this._dialog.open(ModalConfirmComponent, {
      width: !!data && !!data.width ? data.width : '350px',
      data
    });

    this.data = data?.data;
  }

  public open(show: boolean, data?: IModalConfirm) {
    
    if (show) {
      this._openAction(data)
    } else {
      this._dialogRef.close();
    }
  }

  set confirm(data: boolean) {
    this._confirm.next(data);
  }

  get confirm$(): Observable<boolean> {
    return this._confirm.asObservable();
  }

  set data(data: IModalData | undefined) {
    this._data = data;
  }

  get data(): IModalData | undefined {
    return this._data;
  }

}
