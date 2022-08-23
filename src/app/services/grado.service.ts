import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Grado } from '../models/grado';
import { Response } from '../models/reponse';
const httpOption = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class GradoService {
  private url = "Grado";
  constructor(private _http: HttpClient) { }
  public getGrados() : Observable<Response>{
      return this._http.get<Response>(`${environment.apiUrl}/${this.url}`);
  }
  add(grado : Grado): Observable<Response> {
    return this._http.post<Response>(`${environment.apiUrl}/${this.url}`, grado, httpOption);
  }
  edit(grado: Grado): Observable<Response> {
    return this._http.patch<Response>(`${environment.apiUrl}/${this.url}`, grado, httpOption);
  }
  delete(id:number): Observable<Response> {
  return this._http.delete<Response>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
