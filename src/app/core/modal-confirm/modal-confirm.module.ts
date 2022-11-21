import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmService } from './services/modal-confirm.service';
import { ModalConfirmComponent } from './modal-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ModalConfirmComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    ModalConfirmService
  ],
  exports: [ModalConfirmComponent],
})
export class ModalConfirmModule { }
