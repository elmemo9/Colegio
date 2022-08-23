import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Profesor } from '../models/profesor';
import { Response } from '../models/reponse';
const httpOption = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private url = "Profesor";
  constructor(private _http: HttpClient) { }
  public getProfesors() : Observable<Response>{
      return this._http.get<Response>(`${environment.apiUrl}/${this.url}`);
  }
  add(profesor : Profesor): Observable<Response> {
    return this._http.post<Response>(`${environment.apiUrl}/${this.url}`, profesor, httpOption);
  }
  edit(profesor: Profesor): Observable<Response> {
    return this._http.patch<Response>(`${environment.apiUrl}/${this.url}`, profesor, httpOption);
  }
  delete(id:number): Observable<Response> {
  return this._http.delete<Response>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
