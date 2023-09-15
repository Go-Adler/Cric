import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); 
    const verifyToken = localStorage.getItem('verifyToken'); 


    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(clonedRequest);
    }

    if (verifyToken) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${verifyToken}`,
        },
      });

      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
