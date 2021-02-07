import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public post<T>(url: string, params: HttpParams | { [param: string]: string | string[] }, headers?: any): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    if (headers) {
      Object.keys(headers).forEach(key => {
        httpOptions.headers = httpOptions.headers.set(key, headers[key]);
      });
    }
    return this.httpClient.post<T>(url, params, httpOptions);
  }

  public put<T>(url: string, params: HttpParams | { [param: string]: string | string[] }, headers?: any): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    if (headers) {
      Object.keys(headers).forEach(key => {
        httpOptions.headers = httpOptions.headers.set(key, headers[key]);
      });
    }
    return this.httpClient.put<T>(url, params, httpOptions);
  }

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url);
  }
}
