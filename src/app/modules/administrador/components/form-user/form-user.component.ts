import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { IUser } from '@modules/administrador/entities';
import { AdministradorService } from '@modules/administrador/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.sass']
})
export class FormUserComponent implements OnInit, OnDestroy {

  titleForm: string[] = ['Cédula', 'Tipo de Documento', 'Nombres', 'Apellidos', 'Correo', 'Contraseña', 'Repetir Contraseña', 'Rol'];
  formFields: string[] = ['Id', 'TipoId', 'Nombres', 'Apellidos', 'Email', 'Password', 'RepeatPassword', 'Roles'];

  formGroup: FormGroup;

  private _passwordLength = 6;
  private _destroy$ = new Subject();

  constructor(public dialogRef: MatDialogRef<FormUserComponent>, 
    private _adminService: AdministradorService) {
    this._createForm();
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  save() {
    const values = this.formGroup.value;
    console.log(values);
    const { Id, Nombres, Apellidos, Password, Email, Roles, TipoId } = values;
    
    const user: IUser = {
      Id: `${Id}`,
      Nombres,
      Apellidos,
      TipoId,
      Email,
      Password,
      Roles: [
        {
          Id: Roles,
          Nombre: 'admin'
        }
      ]
    }

    console.log(user);
    
    this._adminService.createUser(user)
    .pipe(takeUntil(this._destroy$))
    .subscribe(this._mapUserResponse.bind(this));
  }

  private _mapUserResponse(res: IUser) {
    console.log(res);
    this.dialogRef.close();
  }

  private _createForm() {
    this.formGroup = new FormGroup({
      [this.formFields[0]]: new FormControl('', [Validators.required]),
      [this.formFields[1]]: new FormControl('', [Validators.required]),
      [this.formFields[2]]: new FormControl('', [Validators.required]),
      [this.formFields[3]]: new FormControl('', [Validators.required]),
      [this.formFields[4]]: new FormControl('', [Validators.required, Validators.email]),
      [this.formFields[5]]: new FormControl('', [Validators.required, Validators.maxLength(this._passwordLength), Validators.minLength(this._passwordLength)]),
      [this.formFields[6]]: new FormControl('', [Validators.required, Validators.maxLength(this._passwordLength), Validators.minLength(this._passwordLength)]),
      [this.formFields[7]]: new FormControl('', [Validators.required]),
    });
  }

}
