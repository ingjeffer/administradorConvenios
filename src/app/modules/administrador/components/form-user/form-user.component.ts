import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject, takeUntil } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@const/contants';
import { CustomValidators } from '@helpers/index';
import { IRoles, ITypeModal, IUser, TypeModal } from '@modules/administrador/entities';
import { AdministradorService } from '@modules/administrador/services';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.sass']
})
export class FormUserComponent implements OnInit, OnDestroy {

  titleForm: string[] = ['Cédula', 'Tipo de Documento', 'Nombres', 'Apellidos', 'Correo', 'Contraseña', 'Repetir Contraseña', 'Rol', 'Firmar'];
  formFields: string[] = ['id', 'tipoId', 'nombres', 'apellidos', 'email', 'password', 'repeatPassword', 'roleId', 'firma'];
  roles: IRoles[] = [];
  formGroup: FormGroup;
  typeForm: TypeModal;
  checkSignature: boolean = false;

  showPassword = false;
  showRepeatPassword = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  private _passwordMaxLength = PASSWORD_MAX_LENGTH;
  private _passwordMinLength = PASSWORD_MIN_LENGTH;
  private _destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<FormUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITypeModal<IUser>,
    private _adminService: AdministradorService) {
    this._createForm();
   }

  ngOnInit(): void {
    this._adminService.listRoles().subscribe((data) => {
      this.roles = data;
    });
    this.dialogRef.afterOpened()
    .pipe(takeUntil(this._destroy$))
    .subscribe(() => {
      console.log(this.data.data);
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

  onFileSelected(event: any) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this._setFileBase64(base64);
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  save() {
    const values = this.formGroup.value;
    const { id, nombres, apellidos, password, email, roleId, tipoId, firma } = values;

    const user: IUser = {
      id: `${id}`,
      nombres,
      apellidos,
      tipoId,
      email,
      password,
      roleId,
      firma,
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
      [this.formFields[5]]: new FormControl('', [Validators.required, Validators.maxLength(this._passwordMaxLength), Validators.minLength(this._passwordMinLength)]),
      [this.formFields[6]]: new FormControl('', [Validators.required, Validators.maxLength(this._passwordMaxLength), Validators.minLength(this._passwordMinLength)]),
      [this.formFields[7]]: new FormControl('', [Validators.required]),
      [this.formFields[8]]: new FormControl('', [Validators.required]),
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

  get signatureAlias() {
    return this.formGroup.get(this.formFields[8]);
  }

  private _setFileBase64(base64: string) {
    this.signatureAlias?.setValue(base64);
  }
}
