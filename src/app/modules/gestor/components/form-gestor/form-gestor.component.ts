import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { GestorService } from '@modules/gestor/services';
import { Subject, takeUntil } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITypeModal, TypeModal } from '@modules/administrador/entities';
import { IGestor } from '@modules/gestor/entities';


@Component({
  selector: 'app-form-gestor',
  templateUrl: './form-gestor.component.html',
  styleUrls: ['./form-gestor.component.sass']
})
export class FormGestorComponent implements OnInit, OnDestroy {

  @ViewChild('beneficioInput', { static: false }) beneficioInput: ElementRef;
  @ViewChild('caracterizacionInput', { static: false }) caracterizacionInput: ElementRef;

  formGroup: FormGroup;
  typeForm: TypeModal;

  titleForm: string[] = ['Id', 'Nombre Institución', 'Nombre del Convenio', 'Objeto del Convenio', 'Tipología del Convenio', 'Beneficios o Aportes para la UIS/Modalidad de Convenio', 'Beneficiarios de la UIS', 'Caracterización del Objeto y las Actividades del Convenio'];
  formFields: string[] = ['id', 'nombreInstitucion', 'nombreConvenio', 'objetoConvenio', 'tipologiaConvenio', 'modalidadConvenio', 'beneficiarios', 'caracterizacion', 'infoGestor'];
  titleInfoForm: string[] = ['Nombre Responsable del Convenio', 'Fecha', 'Unidad Académica/Administrativa', 'Cargo', 'E-mail', 'Teléfono'];
  formInfoFields: string[] = ['nombreResponsable', 'fecha', 'unidadAcademica', 'cargo', 'email', 'telefono'];

  private _destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<FormGestorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITypeModal<IGestor>,
    private _gestorService: GestorService
  ) {
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
    const { value } = this.formGroup;
    const req = {
      ...value,
      modalidadConvenio: value.modalidadConvenio === 'Otro' ? this.beneficioInput.nativeElement.value : value.modalidadConvenio,
      caracterizacion: value.caracterizacion === 'Otro' ? this.caracterizacionInput.nativeElement.value : value.caracterizacion,
      infoGestor: {
        ...value.infoGestor,
        fecha: typeof(value.infoGestor.fecha) === 'string' ? value.infoGestor.fecha : `${value.infoGestor.fecha.format('YYYY-MM-DD')}T00:00:00Z`
      }
    };

    this._gestorService[this.typeForm === 'CREATE' ? 'createConvenio' : 'updateConvenio'](req).subscribe((data) => {
      this.dialogRef.close();
    });
  }


  private _createForm() {
    this.formGroup = new FormGroup({
      [this.formFields[0]]: new FormControl(''),
      [this.formFields[1]]: new FormControl('', [Validators.required]),
      [this.formFields[2]]: new FormControl('', [Validators.required]),
      [this.formFields[3]]: new FormControl('', [Validators.required]),
      [this.formFields[4]]: new FormControl('', [Validators.required]),
      [this.formFields[5]]: new FormControl('', [Validators.required]),
      [this.formFields[6]]: new FormControl('', [Validators.required]),
      [this.formFields[7]]: new FormControl('', [Validators.required]),
      [this.formFields[8]]: new FormGroup({
        [this.formInfoFields[0]]: new FormControl('', [Validators.required]),
        [this.formInfoFields[1]]: new FormControl('', [Validators.required]),
        [this.formInfoFields[2]]: new FormControl('', [Validators.required]),
        [this.formInfoFields[3]]: new FormControl('', [Validators.required]),
        [this.formInfoFields[4]]: new FormControl('', [Validators.required, Validators.email]),
        [this.formInfoFields[5]]: new FormControl('', [Validators.required]),
      }),
      estado: new FormControl(''),
    });
  }

  private _setFormValues(user: IGestor) {
    this.formGroup.setValue(user);
  }

  get beneficiosAlias(): AbstractControl | null {
    return this.formGroup.get(this.formFields[5]);
  }

  get caracterizacionAlias(): AbstractControl | null {
    return this.formGroup.get(this.formFields[7]);
  }

}
