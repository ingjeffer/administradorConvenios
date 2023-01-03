import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { clearAllSession, mapTokenToPath, pathUtils } from '@helpers/index';
import { INavigatePath, NavigatePath } from '@const/navigate';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {}

  logout() {
    clearAllSession();
    this._router.navigate([pathUtils(NavigatePath.Login)]);
  }

  get pathNavigate(): INavigatePath {
    return NavigatePath
  }

  get path(): string {
    return mapTokenToPath();
  }
}
