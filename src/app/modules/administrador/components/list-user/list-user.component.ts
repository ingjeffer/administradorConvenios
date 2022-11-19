import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IUser, IUserTable } from '@modules/administrador/entities';
import { AdministradorService } from '@modules/administrador/services';
import { Subject, takeUntil } from 'rxjs';
import { FormUserComponent } from '..';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.sass']
})
export class ListUserComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Id', 'Nombres', 'Apellidos', 'TipoId', 'Email', 'Roles', 'Options'];
  titleColumns: string[] = ['Cédula', 'Tipo de Documento', 'Nombres', 'Apellidos', 'Correo', 'Rol', 'Opciones'];
  dataSource: MatTableDataSource<IUserTable>;

  faEdit = faEdit;
  faTrash = faTrash;

  private _destroy$ = new Subject();
  constructor(private _adminService: AdministradorService, 
    private _dialog: MatDialog) { }

  ngOnInit(): void {
    this._dialog.afterAllClosed
    .pipe(takeUntil(this._destroy$))
    .subscribe(() => this._callUsers());
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(event: any) {
    console.log(event);
  }

  deleteUser(event: any) {
    console.log(event);
  }

  createUser() {
    this._dialog.open(FormUserComponent, {
      width: '500px'
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
      Roles: us.Roles.length > 0 ? us.Roles[0].Nombre : '',
    }));
    this.dataSource = new MatTableDataSource<IUserTable>(data);
  }

}
