import { Injectable } from '@angular/core'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class SignUpDataService {
  private signUpData: User = {} as User

  setSignUpData(userData: User): void {
    this.signUpData = userData
  }

  getSignUpData(): User {
    return this.signUpData
  }

  clearSignUpData(): void {
    this.signUpData = {} as User
  }
}