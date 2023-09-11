// cloudinary-interceptor.service.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CloudinaryInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check for the host
    const regex = /api.cloudinary.com/i;
    if (regex.test(request.url)) {
      // Detach the header
      request = request.clone({
        headers: request.headers.delete('Authorization'),
      });
    }

    return next.handle(request);
  }
}