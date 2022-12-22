import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalConfirmService } from '@core/modal-confirm';
import { faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { TypeModal } from '@modules/administrador/entities';
import { IGestor, IGestorTable } from '@modules/gestor/entities';
import { GestorService } from '@modules/gestor/services';
import { Subject, takeUntil } from 'rxjs';
import { FormGestorComponent } from '..';


@Component({
  selector: 'app-list-gestor',
  templateUrl: './list-gestor.component.html',
  styleUrls: ['./list-gestor.component.sass']
})
export class ListGestorComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  titleColumns: string[] = ['Nombre Institución', 'Nombre del Convenio', 'Tipología del Convenio', 'Caracterizacion', 'Opciones'];
  displayedColumns: string[] = ['nombreInstitucion', 'nombreConvenio', 'tipologiaConvenio', 'caracterizacion', 'options'];
  dataSource: MatTableDataSource<IGestorTable>;

  faEdit = faEdit;
  faDownload = faDownload;

  private _destroy$ = new Subject();
  
  constructor(
    private _gestorService: GestorService,
    private _modalService: ModalConfirmService,
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openFormModal(type: TypeModal, data?: IGestorTable) {    
    this._dialog.open(FormGestorComponent, {
      width: '500px',
      data: {
        type,
        data,
      }
    });
  }

  downloadPdf(id: any) {
    console.log(id);

    this._gestorService.getPdf(id).subscribe((data) => {
      let fileURL = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
      window.open(fileURL); 
      var a         = document.createElement('a');
      a.href        = fileURL; 
      a.target      = '_blank';
      a.download    = `convenio-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
    });
    
  }


  private _mapGestorResponse(res: IGestor[]) {
    this.dataSource = new MatTableDataSource<IGestorTable>(res);
    this._setupDataSource();
  }

  private _setupDataSource() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private _callConvenios() {
    this._gestorService.listConvenios()
    .pipe(takeUntil(this._destroy$))
    .subscribe(this._mapGestorResponse.bind(this));
  }

}

