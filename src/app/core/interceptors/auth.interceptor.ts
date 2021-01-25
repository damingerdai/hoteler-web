import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenReponse } from '../models';
import { LocalStorageService } from '../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private localStorageService: LocalStorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.localStorageService.get<ITokenReponse>('user')?.accessToken;
    if (accessToken) {
      const authReq = request.clone({ setHeaders: { accessToken }});
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
