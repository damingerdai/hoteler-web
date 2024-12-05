import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public post<T>(url: string, params: HttpParams | Record<string, string | string[]>, headers?: unknown): Observable<T> {
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

  public put<T>(url: string, params: HttpParams | Record<string, string | string[]>, headers?: unknown): Observable<T> {
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

  public get<T>(url: string, params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>, headers?: unknown): Observable<T> {
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

    return this.httpClient.get<T>(url, { params });
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url);
  }
}
