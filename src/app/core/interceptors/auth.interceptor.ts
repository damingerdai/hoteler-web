import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SettingsService } from '../services/settings/settings.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private settings: SettingsService,
    private dialog: MatDialog
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.afterIntercept(this.doIntercept(request, next));
  }

  private doIntercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.settings?.user?.accessToken;
    if (accessToken) {
      const authReq = request.clone({ setHeaders: { Authorization: 'Bearer ' + accessToken }});
      return next.handle(authReq);
    }
    return next.handle(request);
  }

  private afterIntercept(response: Observable<HttpEvent<unknown>>) {
    return response.pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              this.dialog.closeAll();
              this.settings.user = null;
              this.router.navigateByUrl('/401');
              break;
            case 403:
              this.dialog.closeAll();
              this.settings.user = null;
              this.router.navigateByUrl('/403');
              break;
            default:
              return throwError(() => error);
          }
        }
        return throwError(() => error);
      })
    );
  }
}
