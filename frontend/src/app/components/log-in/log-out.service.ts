import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogOutService {
  constructor() {}

  logOut(): void {
    localStorage.removeItem('token')
  }
}
