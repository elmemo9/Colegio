import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Alumno } from '../models/alumno';
import { Response } from '../models/reponse';
const httpOption = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private url = "Alumno";
  constructor(private _http: HttpClient) { }
  public getAlumnos() : Observable<Response>{
      return this._http.get<Response>(`${environment.apiUrl}/${this.url}`);
  }
  add(alumno : Alumno): Observable<Response> {
    return this._http.post<Response>(`${environment.apiUrl}/${this.url}`, alumno, httpOption);
  }
  edit(alumno: Alumno): Observable<Response> {
      return this._http.patch<Response>(`${environment.apiUrl}/${this.url}`, alumno, httpOption);
  }
  delete(id:number): Observable<Response> {
  return this._http.delete<Response>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
