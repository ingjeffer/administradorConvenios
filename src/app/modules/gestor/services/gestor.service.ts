import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IGestor } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class GestorService {

  constructor(private _http: HttpClient) { }

  listConvenios() {
    return this._http.get<IGestor[]>(environment.api.base + environment.api.convenios);
  }

  getConvenio(id: string) {
    return this._http.get<IGestor>(`${environment.api.base + environment.api.convenios}/${id}`);
  }

  createConvenio(convenio: IGestor) {
    return this._http.post<IGestor>(environment.api.base + environment.api.convenios, convenio);
  }

  updateConvenio(convenio: IGestor) {
    return this._http.put<IGestor>(environment.api.base + environment.api.convenios, convenio);
  }

  getPdf(id: string) {
    return this._http.get<any>(`${environment.api.base + environment.api.pdfConvenios}/${id}`);
  }
}
