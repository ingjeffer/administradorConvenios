import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ICambiarEstado } from '@modules/secretaria/entities';
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

  firmarConvenio(file: File, id: string) {
    const formData = new FormData();
    formData.append('firma', file, file.name);
    return this._http.post<IGestor>(`${environment.api.base + environment.api.firmarConvenios}/${id}`, formData);
  }

  cambiarEstadoConvenios(estado: ICambiarEstado, id: string) {
    return this._http.post<IGestor>(`${environment.api.base + environment.api.cambiarEstadoConvenios}/${id}`, estado);
  }

  updateConvenio(convenio: IGestor) {
    return this._http.put<IGestor>(environment.api.base + environment.api.convenios, convenio);
  }

  getPdf(id: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this._http.get<any>(`${environment.api.base + environment.api.pdfConvenios}/${id}`,
    { headers, responseType: 'blob' as 'json' });
  }
}
