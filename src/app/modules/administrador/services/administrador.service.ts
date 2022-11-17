import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private _http: HttpClient) { }

  listUser() {
    return this._http.get<IUser[]>(environment.api.base + environment.api.user);
  }
}
