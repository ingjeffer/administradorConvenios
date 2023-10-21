import {
  EstadoConvenioConsejoAca,
  EstadoDirJuridico,
  EstadoRectoria,
  EstadoVicerrectoria,
  EstadoConvenioDirectorRelex,
  EstadoConvenioSecretaria,
  IEstadoConvenioConsejoAca,
  IEstadoDirJuridico,
  IEstadoRectoria,
  IEstadoVicerrectoria,
  IEstadoConvenioSecretaria,
  IEstadoConvenioDirectorRelex,
} from '@modules/gestor/constants/estados-convenio';
import { ICambiarEstado } from '@modules/secretaria/entities/cambiar-estado';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getRoleId } from '@helpers/index';
import { ITypeModal } from '@modules/administrador/entities';
import { IGestor } from '@modules/gestor/entities';
import { GestorService } from '@modules/gestor/services';
import { Subject, takeUntil } from 'rxjs';
import { ROLES } from '@const/contants';

@Component({
  selector: 'app-gestion-secretaria',
  templateUrl: './gestion-secretaria.component.html',
  styleUrls: ['./gestion-secretaria.component.sass']
})
export class GestionSecretariaComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  titleForm: string[] = ['Id', 'Nombre Institución', 'Nombre del Convenio', 'Objeto del Convenio', 'Tipología del Convenio', 'Beneficios o Aportes para la UIS/Modalidad de Convenio', 'Beneficiarios de la UIS', 'Caracterización del Objeto y las Actividades del Convenio'];
  formFields: string[] = ['id', 'nombreInstitucion', 'nombreConvenio', 'objetoConvenio', 'tipologiaConvenio', 'modalidadConvenio', 'beneficiarios', 'caracterizacion', 'infoGestor'];
  titleInfoForm: string[] = ['Nombre Responsable del Convenio', 'Fecha', 'Unidad Académica/Administrativa', 'Cargo', 'E-mail', 'Teléfono'];
  formInfoFields: string[] = ['nombreResponsable', 'fecha', 'unidadAcademica', 'cargo', 'email', 'telefono'];

  lengthFirstForm = [ ...Array(8).keys() ];
  lengthInfoForm = [ ...Array(6).keys() ];

  roleId: number = -1;
  currentState: string | undefined = "";

  private _destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<GestionSecretariaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITypeModal<IGestor>,
    private _gestorService: GestorService
  ) {
    this._createForm();
   }

  ngOnInit(): void {
    this.dialogRef.afterOpened()
    .pipe(takeUntil(this._destroy$))
    .subscribe(() => {
      this.currentState = this.data.data.estado;
      this._setFormValues(this.data.data);
    });

    this.roleId = getRoleId();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  save() {
    const { value } = this.formGroup;
    const state: ICambiarEstado = {
      cambioEstado: this.estadoAlias?.value !== this.options.Rechazado,
      observacion: this.observacionAlias?.value,
    };
    this._gestorService.cambiarEstadoConvenios(state, value.id).subscribe((_data) => {
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
      estado: new FormControl('', [Validators.required]),
      observaciones: new FormControl(''),
    });
  }

  getValueField(index: number): any {
    return this.formGroup?.get(this.formFields[index])?.value;
  }

  getValueInfoField(index: number): any {
    return this.formGroup?.get(this.formFields[8])?.get(this.formInfoFields[index])?.value;
  }

  private _setFormValues(user: IGestor) {
    const userCustom = {
      ...user,
      observaciones: user.observaciones ?? ''
    };
    this.formGroup.setValue(userCustom);
  }

  get estadoAlias(): AbstractControl | null {
    return this.formGroup.get('estado');
  }

  get observacionAlias(): AbstractControl | null {
    return this.formGroup.get('observaciones');
  }

  get estadoRectoria(): IEstadoRectoria {
    return EstadoRectoria;
  }

  get stateOptions(): Array<any> {
    switch (this.roleId) {
      case ROLES.SECRETARIA:
        return this.currentState === EstadoRectoria.Aprobado ? [EstadoConvenioSecretaria.Aprobado] : Object.values(EstadoConvenioSecretaria);
      case ROLES.DIRECTOR_RELEX:
        return Object.values(EstadoConvenioDirectorRelex);
      case ROLES.CONSEJO_ACADEMICO:
        return Object.values(EstadoConvenioConsejoAca);
      case ROLES.VICERRECTORIA:
        return Object.values(EstadoVicerrectoria);
      case ROLES.DIR_JURIDICO:
        return Object.values(EstadoDirJuridico);
      case ROLES.RECTORIA:
        return Object.values(EstadoRectoria);
      default:
        return Object.values(EstadoConvenioSecretaria);
    }
  }

  get options(): IEstadoConvenioSecretaria | IEstadoConvenioDirectorRelex |
                 IEstadoConvenioConsejoAca | IEstadoVicerrectoria |
                 IEstadoDirJuridico | IEstadoRectoria {
    switch (this.roleId) {
      case 3:
        return EstadoConvenioSecretaria;
      case 4:
        return EstadoConvenioDirectorRelex;
      case 5:
        return EstadoConvenioConsejoAca;
      case 6:
        return EstadoVicerrectoria;
      case 7:
        return EstadoDirJuridico;
      case 8:
        return EstadoRectoria;
      default:
        return EstadoConvenioSecretaria;
    }
  }
}
