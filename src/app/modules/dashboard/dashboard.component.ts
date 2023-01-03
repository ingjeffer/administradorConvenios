import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigatePath } from '@const/navigate';
import { pathUtils } from '@helpers/path-utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this._router.navigate([pathUtils(NavigatePath.Gestor)]);
  }

}
