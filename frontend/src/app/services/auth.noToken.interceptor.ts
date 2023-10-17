import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LogOutService } from '../user/auth/log-in/log-out.service';

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {
  constructor(private router: Router, private logOutService: LogOutService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            const responseBody = event.body;
            console.log(responseBody, 28);

            if (responseBody.token) {
              const token = responseBody.token;
              localStorage.setItem('token', token);
            }
            if (responseBody.verifyToken) {
              const verifyToken = responseBody.verifyToken;
              localStorage.setItem('verifyToken', verifyToken);
            }
            if (responseBody.invalidToken) {
              this.logOutService.logOut();
              if (this.router.url !== '/auth/log-in') {
                this.router.navigateByUrl('/auth/log-in');
              }
            }

            if (responseBody.notVerified) {
              this.router.navigateByUrl('/auth/sign-up-otp');
            }
          }
        },
        (error) => {
          if (error.status === 401) {
            this.router.navigateByUrl('/auth/log-in');
          }
        }
      )
    );
  }
}
