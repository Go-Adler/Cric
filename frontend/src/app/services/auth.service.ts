import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginStatus = new BehaviorSubject<boolean>(false);

  loginStatus$ = this.loginStatus.asObservable();

  setLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }

  checkToken(): boolean {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  isLogin():Observable<boolean> {
    return this.loginStatus$
  }
}