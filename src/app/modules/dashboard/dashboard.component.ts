import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mapTokenToPath } from '@helpers/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    const path = mapTokenToPath();
    this._router.navigate([path]);
  }

}
