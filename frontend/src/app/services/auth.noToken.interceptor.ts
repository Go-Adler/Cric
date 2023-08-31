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
import { LogOutService } from '../components/log-in/log-out.service';

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
            if(responseBody.token) {
              console.log('token');
              
              const token = responseBody.token
              localStorage.setItem('token', token)
            }
            if (responseBody.invalidToken) {
              this.logOutService.logOut();
              this.router.navigate(['/user/log-in']);
            }

            if (responseBody.notVerified) {

              this.router.navigate(['/user/verify-otp']);
            }
          }
        },
        (error) => {}
      )
    );
  }
}