import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static registarUsuario = "register"
  static actualizarUsuario = "updateUserInfo"
  static registarDepartamento = "registerDepartment"
  static login = "login"
  static catalogoUsuarios = "getAllUsers"
  static catalogoDepartamentos = "getAllDepartments"
  static catalogoMaterias = "getAllSubjects"
  static catalogoMateriasPorIdUsuario = "getAllSubjectsByUserId"

  private baseUrl: string = "https://sicho-272801.wl.r.appspot.com/";

  constructor(private httpClient: HttpClient) { }


  public post(url, data): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin' : 'http://187.137.41.6:4200/'
      })
    }).pipe(map(data => data));
  }

  public get(url): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + url, {
      headers: new HttpHeaders()
    }).pipe(map(data => data));
  }
}
