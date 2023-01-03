import { ILoginRequest, ILoginResponse } from './../entities/login.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable()
export class LoginService {

  constructor(private _http: HttpClient) { }

  session(body: ILoginRequest) {
    return this._http.post<ILoginResponse>(environment.api.base + environment.api.session, {
      ...body
    });
  }
}
