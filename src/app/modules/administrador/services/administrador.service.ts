import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IRoles, IUser, IUserTable } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private _http: HttpClient) { }

  listRoles() {
    return this._http.get<IRoles[]>(environment.api.base + environment.api.roles);
  }

  listUser() {
    return this._http.get<IUserTable[]>(environment.api.base + environment.api.user);
  }

  createUser(user: IUser) {
    return this._http.post<IUser>(environment.api.base + environment.api.user, user);
  }

  updateUser(user: IUser) {
    return this._http.put<IUser>(environment.api.base + environment.api.user, user);
  }

  deleteUser(typeDocumet: string, document: string) {
    return this._http.delete<IUser>(`${environment.api.base + environment.api.user}/${typeDocumet}/${document}`);
  }
}
