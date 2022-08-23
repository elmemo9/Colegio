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
export class ListService {
  private url = "List";
  constructor(private _http: HttpClient) { }
  public getAlumnos() : Observable<Response>{
      return this._http.get<Response>(`${environment.apiUrl}/${this.url}/alumno`);
  }
    public getGrados() : Observable<Response>{
      return this._http.get<Response>(`${environment.apiUrl}/${this.url}/grado`);
  }
    public getProfesores() : Observable<Response>{
      return this._http.get<Response>(`${environment.apiUrl}/${this.url}/profesor`);
  }
  
}