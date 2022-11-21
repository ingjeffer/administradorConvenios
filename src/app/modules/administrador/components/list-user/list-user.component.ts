import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';

import { IModalData, ModalConfirmService } from '@core/modal-confirm';
import { IUser, IUserTable, TypeModal } from '@modules/administrador/entities';
import { AdministradorService } from '@modules/administrador/services';
import { FormUserComponent } from '..';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.sass']
})
export class ListUserComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Id', 'Nombres', 'Apellidos', 'TipoId', 'Email', 'Roles', 'Options'];
  titleColumns: string[] = ['Cédula', 'Tipo de Documento', 'Nombres', 'Apellidos', 'Correo', 'Rol', 'Opciones'];
  dataSource: MatTableDataSource<IUserTable>;

  faEdit = faEdit;
  faTrash = faTrash;

  private _destroy$ = new Subject();
  private _userSelected: IUserTable;

  constructor(
    private _adminService: AdministradorService,
    private _modalService: ModalConfirmService,
    private _dialog: MatDialog) { }

  ngOnInit(): void {
    this._dialog.afterAllClosed
    .pipe(takeUntil(this._destroy$))
    .subscribe(this._callUsers.bind(this));

    this._modalService.confirm$
    .pipe(takeUntil(this._destroy$))
    .subscribe(this._confirmModal.bind(this));
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(event: any) {
    console.log(event);
    this._userSelected = event;
    
    const data: IModalData = {
      message: '¿Estás seguro de eliminar al usuario?',
      buttonCancel: 'Cancelar',
      buttonOk: 'Eliminar'
    };

    this._modalService.open(true, {
      data
    });
  }

  openFormModal(type: TypeModal, data?: IUser) {
    this._dialog.open(FormUserComponent, {
      width: '500px',
      data: {
        type,
        data: {
          ...data,
          RepeatPassword: data?.Password,
        }
      }
    });
  }

  private _callUsers() {
    this._adminService.listUser()
      .pipe(takeUntil(this._destroy$))
      .subscribe(this._mapUserResponse.bind(this));
  }

  private _mapUserResponse(res: IUser[]) {
    const data: IUserTable[] = res.map((us: IUser) => ({
      Id: us.Id,
      Nombres: us.Nombres,
      Apellidos: us.Apellidos,
      TipoId: us.TipoId,
      Email: us.Email,
      Password: us.Password,
      Roles: us.Roles.length > 0 ? us.Roles[0].Nombre : '',
    }));
    this.dataSource = new MatTableDataSource<IUserTable>(data);
    this._setupDataSource();
  }

  private _confirmModal(confirm: boolean) {
    console.log(confirm);
    
    if (confirm) {
      const { Id, TipoId } = this._userSelected;
      this._adminService.deleteUser(TipoId, Id).subscribe(this._responseDelete.bind(this));
    }
  }

  private _responseDelete(data: any) {
    console.log(data);
  }

  private _setupDataSource() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
