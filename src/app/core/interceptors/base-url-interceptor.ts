import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    let url = req.url;

    if (url.startsWith('api/')) {
        url = `/${url}`;
    }

    if (!/^https?:\/\//i.test(url) && environment.apiOrigin) {
        url = `${environment.apiOrigin.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
    }
    const headers = req.headers.has('Content-Type')
        ? req.headers
        : req.headers.set('Content-Type', 'application/json');
    const clonedReq = req.clone({
        url,
        headers,
    });

    return next(clonedReq);
};
