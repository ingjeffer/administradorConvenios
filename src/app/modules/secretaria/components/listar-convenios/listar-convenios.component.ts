import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faDownload, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { IGestor, IGestorTable } from '@modules/gestor/entities';
import { GestorService } from '@modules/gestor/services';
import { Subject, takeUntil } from 'rxjs';
import { GestionSecretariaComponent } from '..';

@Component({
  selector: 'app-listar-convenios',
  templateUrl: './listar-convenios.component.html',
  styleUrls: ['./listar-convenios.component.sass']
})
export class ListarConveniosComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  titleColumns: string[] = ['Nombre Institución', 'Nombre del Convenio', 'Tipología del Convenio', 'Estado', 'Opciones'];
  displayedColumns: string[] = ['nombreInstitucion', 'nombreConvenio', 'tipologiaConvenio', 'estado', 'options'];
  dataSource: MatTableDataSource<IGestorTable>;

  faSpellCheck = faSpellCheck;
  faDownload = faDownload;

  private _destroy$ = new Subject();

  constructor(
    private _gestorService: GestorService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._dialog.afterAllClosed
    .pipe(takeUntil(this._destroy$))
    .subscribe(this._callConvenios.bind(this));
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openFormModal(data?: IGestorTable): void {
    this._dialog.open(GestionSecretariaComponent, {
      width: '550px',
      data: {
        data,
      }
    });
  }

  downloadPdf(id: any): void {
    this._gestorService.getPdf(id).subscribe((data) => {
      let fileURL = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
      window.open(fileURL);
    });
  }

  private _mapGestorResponse(res: IGestor[]): void {
    this.dataSource = new MatTableDataSource<IGestorTable>(res);
    this._setupDataSource();
  }

  private _setupDataSource(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private _callConvenios(): void {
    this._gestorService.listConvenios()
    .pipe(takeUntil(this._destroy$))
    .subscribe(this._mapGestorResponse.bind(this));
  }

}
