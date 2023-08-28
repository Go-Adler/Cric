import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SignUpDataService {
  private signUpData!: string

  setSignUpData(userData: string): void {
    this.signUpData = userData
  }

  getSignUpData(): string {
    return this.signUpData
  }

  clearSignUpData(): void {
    this.signUpData = ''
  }
}