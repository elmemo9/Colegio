import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { GradoAlumno } from '../models/gradoalumno';
import { Response } from '../models/reponse';
const httpOption = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class GradoAlumnoService {
  private url = "GradoAlumno";
  constructor(private _http: HttpClient) { }
  public getGradoAlumnos() : Observable<Response>{
      return this._http.get<Response>(`${environment.apiUrl}/${this.url}`);
  }
  add(gradoAlumno : GradoAlumno): Observable<Response> {
    return this._http.post<Response>(`${environment.apiUrl}/${this.url}`, gradoAlumno, httpOption);
  }
  edit(gradoAlumno: GradoAlumno): Observable<Response> {
    return this._http.patch<Response>(`${environment.apiUrl}/${this.url}`, gradoAlumno, httpOption);
  }
  delete(id:number): Observable<Response> {
  return this._http.delete<Response>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}