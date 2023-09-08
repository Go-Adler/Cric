import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin() {
    const token = localStorage.getItem('token')
    return token ? true : false
  }
}