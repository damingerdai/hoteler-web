import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private httpClient = inject(HttpClient);

    private resolveUrl(url: string): string {
        if (/^https?:\/\//i.test(url) || !environment.apiOrigin) {
            return url;
        }

        return `${environment.apiOrigin.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
    }

    public post<T>(
        url: string,
        params: HttpParams | Record<string, string | string[]>,
        headers?: Record<string, string>
    ): Observable<T> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        if (headers) {
            Object.keys(headers).forEach((key) => {
                httpOptions.headers = httpOptions.headers.set(
                    key,
                    headers[key]
                );
            });
        }
        return this.httpClient.post<T>(this.resolveUrl(url), params, httpOptions);
    }

    public put<T>(
        url: string,
        params: HttpParams | Record<string, string | string[]>,
        headers?: Record<string, string>
    ): Observable<T> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        if (headers) {
            Object.keys(headers).forEach((key) => {
                httpOptions.headers = httpOptions.headers.set(
                    key,
                    headers[key]
                );
            });
        }
        return this.httpClient.put<T>(this.resolveUrl(url), params, httpOptions);
    }

    public get<T>(
        url: string,
        params?:
            | HttpParams
            | Record<
                  string,
                  | string
                  | number
                  | boolean
                  | readonly (string | number | boolean)[]
              >,
        headers?: Record<string, string>
    ): Observable<T> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        if (headers) {
            Object.keys(headers).forEach((key) => {
                httpOptions.headers = httpOptions.headers.set(
                    key,
                    headers[key]
                );
            });
        }

        return this.httpClient.get<T>(this.resolveUrl(url), { params, headers: httpOptions.headers });
    }

    public delete<T>(url: string): Observable<T> {
        return this.httpClient.delete<T>(this.resolveUrl(url));
    }
}
