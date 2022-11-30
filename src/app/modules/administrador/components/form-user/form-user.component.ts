import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { PASSWORD_MAX_LENGTH } from '@const/contants';
import { CustomValidators } from '@helpers/index';
import { IRoles, ITypeModal, IUser, TypeModal } from '@modules/administrador/entities';
import { AdministradorService } from '@modules/administrador/services';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.sass']
})
export class FormUserComponent implements OnInit, OnDestroy {

  titleForm: string[] = ['Cédula', 'Tipo de Documento', 'Nombres', 'Apellidos', 'Correo', 'Contraseña', 'Repetir Contraseña', 'Rol'];
  formFields: string[] = ['Id', 'TipoId', 'Nombres', 'Apellidos', 'Email', 'Password', 'RepeatPassword', 'Roles'];
  roles: IRoles[] = [
    { Id: 1, Nombre: 'Administrador' },
    { Id: 2, Nombre: 'Profecional de convenios' },
    { Id: 3, Nombre: 'Director juridico' },
    { Id: 4, Nombre: 'Vicerectiria' },
    { Id: 5, Nombre: 'Gestor ante la UIS' },
    { Id: 6, Nombre: 'Director relext' },
    { Id: 7, Nombre: 'Rectoria' },
    { Id: 8, Nombre: 'Institucion cooperante' },
    { Id: 9, Nombre: 'Consejo academico' },
  ];
  formGroup: FormGroup;
  typeForm: TypeModal;

  showPassword = false;
  showRepeatPassword = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  private _passwordLength = PASSWORD_MAX_LENGTH;
  private _destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<FormUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITypeModal<IUser>,
    private _adminService: AdministradorService) {
    this._createForm();
   }

  ngOnInit(): void {
    this.dialogRef.afterOpened()
    .pipe(takeUntil(this._destroy$))
    .subscribe(() => {
      this.typeForm = this.data.type;
      if (!!this.data && this.data.type === 'EDIT') {
        this._setFormValues(this.data.data)
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  save() {
    const values = this.formGroup.value;
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
          Id: 1,
          Nombre: 'admin'
        }
      ]
    }
    
    this._adminService[this.typeForm === 'CREATE' ? 'createUser' : 'updateUser'](user)
    .pipe(takeUntil(this._destroy$))
    .subscribe(this._mapUserResponse.bind(this));
  }

  private _mapUserResponse(res: IUser) {
    this.dialogRef.close();
  }

  private _createForm() {
    this.formGroup = new FormGroup({
      [this.formFields[0]]: new FormControl('', [Validators.required]),
      [this.formFields[1]]: new FormControl('CC', [Validators.required]),
      [this.formFields[2]]: new FormControl('', [Validators.required]),
      [this.formFields[3]]: new FormControl('', [Validators.required]),
      [this.formFields[4]]: new FormControl('', [Validators.required, Validators.email]),
      [this.formFields[5]]: new FormControl('', [Validators.required, Validators.maxLength(this._passwordLength), Validators.minLength(this._passwordLength)]),
      [this.formFields[6]]: new FormControl('', [Validators.required, Validators.maxLength(this._passwordLength), Validators.minLength(this._passwordLength)]),
      [this.formFields[7]]: new FormControl('', [Validators.required]),
    }, 
      [CustomValidators.MatchValidator(this.formFields[5], this.formFields[6])]
    );
  }

  get passwordMatchError() {
    return (
      this.formGroup.getError('mismatch') &&
      this.formGroup.get(this.formFields[6])?.touched
    );
  }
  
  private _setFormValues(user: IUser) {
    this.formGroup.setValue(user);
  }
}
